import jwt from "jsonwebtoken";

export function optionalAuth(req, res, next) {
  console.log('🔍 optionalAuth - Session:', req.session);
  
  // Check session-based auth first
  if (req.session?.alumniId) {
    req.user = {
      id: req.session.alumniId,
      role: req.session.role || 'alumni',
      email: req.session.email
    };
    console.log('✅ Session-based auth (Alumni):', req.user);
    return next();
  }
  
  if (req.session?.studentId) {
    req.user = {
      id: req.session.studentId,
      role: req.session.role || 'student',
      email: req.session.email
    };
    console.log('✅ Session-based auth (Student):', req.user);
    return next();
  }

  if (req.session?.adminId) {
    req.user = {
      id: req.session.adminId,
      role: 'admin',
      email: req.session.email
    };
    console.log('✅ Session-based auth (Admin):', req.user);
    return next();
  }

  // Fallback to JWT if present
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
      req.user = decoded;
      console.log('✅ JWT-based auth:', req.user);
    } catch (err) {
      console.log('❌ Invalid JWT token');
    }
  }

  next();
}

export function requireAuth(req, res, next) {
  console.log('🔍 requireAuth - Session:', req.session);
  
  // Check session-based auth first
  if (req.session?.alumniId) {
    req.user = {
      id: req.session.alumniId,
      role: req.session.role || 'alumni',
      email: req.session.email
    };
    console.log('✅ Authenticated (Alumni):', req.user);
    return next();
  }
  
  if (req.session?.studentId) {
    req.user = {
      id: req.session.studentId,
      role: req.session.role || 'student',
      email: req.session.email
    };
    console.log('✅ Authenticated (Student):', req.user);
    return next();
  }

  // Fallback to JWT
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.log('❌ No session or token found');
    return res.status(401).json({ ok: false, error: "Login required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
    req.user = decoded;
    console.log('✅ Authenticated (JWT):', req.user);
    next();
  } catch (err) {
    console.log('❌ Invalid JWT token');
    return res.status(401).json({ ok: false, error: "Invalid or expired token" });
  }
}

export function requireAdmin(req, res, next) {
  console.log('🔍 requireAdmin - Session:', req.session);
  console.log('🔍 requireAdmin - Method:', req.session?.adminId ? 'session' : 'jwt');

  // Check session-based auth
  if (req.session?.adminId || req.session?.role === 'admin') {
    req.user = {
      id: req.session.adminId || 'admin',
      role: 'admin',
      email: req.session.email
    };
    console.log('✅ Admin authenticated (session):', req.user);
    return next();
  }

  // Fallback to JWT
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    console.log('❌ Admin access denied - no session or token');
    return res.status(401).json({ ok: false, error: "Login required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");

    if (decoded.role !== "admin") {
      console.log('❌ Admin access denied - wrong role:', decoded.role);
      return res.status(403).json({ ok: false, error: "Admin only" });
    }

    req.user = decoded;
    console.log('✅ Admin authenticated (JWT):', req.user);
    next();
  } catch (err) {
    console.log('❌ Invalid JWT token');
    return res.status(401).json({ ok: false, error: "Invalid or expired token" });
  }
}
