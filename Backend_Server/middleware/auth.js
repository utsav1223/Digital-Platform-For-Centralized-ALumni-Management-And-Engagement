import jwt from "jsonwebtoken";

export function optionalAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
    req.user = decoded;
  } catch (err) {}

  next();
}

export function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ ok: false, error: "Login required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ ok: false, error: "Invalid or expired token" });
  }
}

export function requireAdmin(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ ok: false, error: "Login required" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");

    if (decoded.role !== "admin") {
      return res.status(403).json({ ok: false, error: "Admin only" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ ok: false, error: "Invalid or expired token" });
  }
}
