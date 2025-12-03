// AdminDashboard.jsx (updated)
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./admin-components/sidebar.jsx";
import RequestCard from "./admin-components/Requestcard.jsx";
import ReportsList from "./admin-components/ReportList.jsx";

/* --- Inline icons (kept as-is) --- */
const SearchIcon = () => (<svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>);
const CloseIcon = () => (<svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>);
const StatIconTotal = () => (<svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>);
const StatIconPending = () => (<svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>);
const StatIconReport = () => (<svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>);

/* --- Move small UI components out of render to avoid re-creation --- */
const SelectInput = ({ children, ...props }) => (
  <div className="relative">
    <select {...props} className="appearance-none w-full bg-white border border-slate-200 text-slate-700 py-2.5 px-4 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium cursor-pointer shadow-sm">
      {children}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
      <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
    </div>
  </div>
);

const StatCard = ({ title, count, icon, colorClass }) => (
  <div className="flex items-center p-4 bg-white rounded-xl border border-white shadow-lg shadow-slate-200/50">
    <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>{icon}</div>
    <div className="ml-4">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">{title}</p>
      <p className="text-2xl font-bold text-slate-800">{count}</p>
    </div>
  </div>
);

export default function AdminDashboard() {
  const navigate = useNavigate();

  // --- Router guard inside the dashboard — double-safety (in-case route leak exists) ---
  useEffect(() => {
    // Verify presence of client token (same logic as ProtectedRoute)
    try {
      const raw = localStorage.getItem('admin_token');
      if (!raw) {
        navigate('/admin/login', { replace: true });
        return;
      }
      const token = JSON.parse(raw);
      if (!token || !token.expiry || Date.now() > token.expiry) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('isAdminLoggedIn');
        navigate('/admin/login', { replace: true });
        return;
      }
    } catch (err) {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('isAdminLoggedIn');
      navigate('/admin/login', { replace: true });
    }
    // intentionally no dependencies beyond navigate to run on mount
  }, [navigate]);

  // --- Enforce Light Mode (Bright & Clean) ---
  useEffect(() => {
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
    localStorage.setItem("admin_theme", "light");
  }, []);

  // State
  const [view, setView] = useState("requests");
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 9;
  const [activeItem, setActiveItem] = useState(null);

  // Data loading (keeps same behavior but unchanged)
  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoadingRequests(true);
      try {
        const res = await fetch("/api/admin/requests");
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = await res.json();
        if (mounted) setRequests(data.requests || []);
      } catch (err) {
        console.warn("Using mock requests:", err);
        if (mounted) setRequests(mockRequests());
      } finally {
        if (mounted) setLoadingRequests(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    async function loadReports() {
      setLoadingReports(true);
      try {
        const res = await fetch("/api/admin/reports");
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const data = await res.json();
        if (mounted) setReports(data.reports || []);
      } catch (err) {
        console.warn("Using mock reports:", err);
        if (mounted) setReports(mockReports());
      } finally {
        if (mounted) setLoadingReports(false);
      }
    }
    if (view === "reports") loadReports();
    return () => (mounted = false);
  }, [view]);

  // Filtering — memoized to avoid recomputation on unrelated changes
  const filteredRequests = useMemo(() => {
    let list = requests;
    if (typeFilter !== "all") list = list.filter((r) => r.type === typeFilter);
    if (statusFilter !== "all") list = list.filter((r) => r.status === statusFilter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.name.toLowerCase().includes(q) ||
          (r.email && r.email.toLowerCase().includes(q))
      );
    }
    return list;
  }, [requests, typeFilter, statusFilter, query]);

  const totalPages = Math.max(1, Math.ceil(filteredRequests.length / PAGE_SIZE));
  // pagedRequests memoized
  const pagedRequests = useMemo(
    () => filteredRequests.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredRequests, page]
  );

  useEffect(() => setPage(1), [typeFilter, statusFilter, query]);

  // Handlers memoized for stable refs
  const toggleSelect = useCallback((id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const selectAllVisible = useCallback(() => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      pagedRequests.forEach((r) => next.add(r.id));
      return next;
    });
  }, [pagedRequests]);

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  const updateStatus = useCallback(async (ids, status) => {
    // optimistic UI update
    setRequests((prev) => prev.map((r) => (ids.includes(r.id) ? { ...r, status } : r)));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.delete(id));
      return next;
    });

    try {
      await fetch("/api/admin/requests/bulk-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids, status }),
      });
    } catch (err) {
      console.error("Update failed", err);
      setError("Update failed: " + err.message);
      // revert to pending for those ids
      setRequests((prev) => prev.map((r) => (ids.includes(r.id) ? { ...r, status: "pending" } : r)));
    }
  }, []);

  const handleSingleAction = useCallback(async (id, status) => { await updateStatus([id], status); }, [updateStatus]);
  const handleBulkAction = useCallback(async (status) => { if (selectedIds.size > 0) await updateStatus(Array.from(selectedIds), status); }, [selectedIds, updateStatus]);

  const deletePostAndNotify = useCallback(async (reportId, postId, reporterUserId) => {
    const original = reports.slice();
    setReports((prev) => prev.filter((r) => r.id !== reportId));
    try {
      const res = await fetch(`/api/admin/posts/${postId}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
      await fetch("/api/admin/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: reporterUserId, subject: "Report processed", message: "Your report was reviewed and the post has been removed." }),
      });
    } catch (err) {
      setError("Failed to delete post: " + err.message);
      setReports(original);
    }
  }, [reports]);

  const dismissReport = useCallback(async (reportId) => {
    setReports((prev) => prev.filter((r) => r.id !== reportId));
    try { await fetch(`/api/admin/reports/${reportId}/dismiss`, { method: "POST" }); } 
    catch (err) { setError("Failed to dismiss: " + err.message); }
  }, []);

  const sendReportNotification = useCallback(async (userId, type, reason) => {
    try {
      await fetch("/api/admin/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, subject: `Report: ${type}`, message: `A report was filed: ${reason}` }),
      });
    } catch (err) { setError("Notification failed: " + err.message); }
  }, []);

  // derived counts memoized
  const total = useMemo(() => requests.length, [requests]);
  const pending = useMemo(() => requests.filter((r) => r.status === "pending").length, [requests]);
  const reportCount = useMemo(() => reports.length, [reports]);
  
  function handleLogout() {
    // Clear auth flag
    localStorage.removeItem("isAdminLoggedIn");
    // Redirect to login page
    navigate('/admin/login');
  }

  return (
    <div className="min-h-screen font-sans bg-[#F1F5F9] relative overflow-hidden">
      {/* background decor omitted for brevity (kept same as original) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/30 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/30 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto p-4 lg:p-6 h-screen flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64 flex-shrink-0">
          <div className="animate-enter delay-200 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white h-full">
            <Sidebar
              view={view}
              setView={setView}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              selectAllVisible={selectAllVisible}
              clearSelection={clearSelection}
            />
          </div>
        </div>

        <main className="animate-enter delay-300 flex-1 flex flex-col h-full overflow-hidden">
          <div className="mb-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
                  {view === "requests" ? "Request Board" : "Report Center"}
                </h1>
                <p className="mt-1 text-slate-500 font-medium">
                  {view === "requests" ? "Manage incoming mentorship and job applications." : "Review flagged content and maintain community guidelines."}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full md:w-auto">
                <StatCard title="Total" count={total} icon={<StatIconTotal />} colorClass="bg-indigo-500" />
                <StatCard title="Pending" count={pending} icon={<StatIconPending />} colorClass="bg-amber-500" />
                <StatCard title="Reports" count={reportCount} icon={<StatIconReport />} colorClass="bg-rose-500" />
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl p-4 rounded-2xl shadow-sm border border-white flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:max-w-md group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon />
                </div>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, title or email..."
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm transition-all shadow-sm"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                <SelectInput value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                  <option value="all">All Types</option>
                  <option value="mentorship">Mentorship</option>
                  <option value="internship">Internship</option>
                  <option value="job">Jobs</option>
                </SelectInput>

                {view === "requests" && (
                  <SelectInput value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="pending">Status: Pending</option>
                    <option value="accepted">Status: Accepted</option>
                    <option value="rejected">Status: Rejected</option>
                    <option value="all">Status: All</option>
                  </SelectInput>
                )}

                {view === "requests" && selectedIds.size > 0 && (
                  <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                    <button onClick={() => handleBulkAction("accepted")} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                      Accept ({selectedIds.size})
                    </button>
                    <button onClick={() => handleBulkAction("rejected")} className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                      Reject ({selectedIds.size})
                    </button>
                  </div>
                )}

                <button
                  onClick={() => { setPage(1); setQuery(""); setTypeFilter("all"); setStatusFilter("pending"); }}
                  className="p-2.5 text-slate-500 hover:text-slate-700 hover:bg-white bg-slate-50 border border-transparent hover:border-slate-200 rounded-xl transition-all shadow-sm"
                  title="Reset Filters"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {view === "requests" ? (
              loadingRequests ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-64 bg-white rounded-2xl animate-pulse shadow-sm"></div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                    {pagedRequests.length === 0 && (
                      <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-400">
                        <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                        <p className="text-lg font-medium">No requests found</p>
                        <p className="text-sm">Try adjusting your filters</p>
                      </div>
                    )}
                    {pagedRequests.map((r) => (
                      <RequestCard
                        key={r.id}
                        r={r}
                        selectedIds={selectedIds}
                        toggleSelect={toggleSelect}
                        handleSingleAction={handleSingleAction}
                        setActiveItem={setActiveItem}
                      />
                    ))}
                  </div>

                  {filteredRequests.length > 0 && (
                    <div className="sticky bottom-0 bg-white/90 backdrop-blur border-t border-slate-200 p-4 flex items-center justify-between rounded-t-xl mt-auto shadow-lg z-10">
                      <span className="text-sm text-slate-500">
                        Page <span className="font-semibold text-slate-800">{page}</span> of {totalPages}
                      </span>
                      <div className="flex gap-2">
                        <button
                          disabled={page === 1}
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Previous
                        </button>
                        <button
                          disabled={page === totalPages}
                          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                          className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )
            ) : (
              loadingReports ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-20 bg-white rounded-xl animate-pulse shadow-sm"></div>
                  ))}
                </div>
              ) : (
                <ReportsList
                  reports={reports}
                  deletePostAndNotify={deletePostAndNotify}
                  dismissReport={dismissReport}
                  sendReportNotification={sendReportNotification}
                  setActiveItem={setActiveItem}
                />
              )
            )}
          </div>

          {activeItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" onClick={() => setActiveItem(null)}></div>
              <div className="relative bg-white w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-white animation-scale-in">
                {/* modal header & content (kept same) */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/80">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {activeItem.type === 'request' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700">
                          {activeItem.data.type}
                        </span>
                      )}
                      <h2 className="text-xl font-bold text-slate-800 truncate max-w-md">
                        {activeItem.type === 'request' ? activeItem.data.title : activeItem.data.postTitle}
                      </h2>
                    </div>
                    <p className="text-sm text-slate-500">
                      {activeItem.type === 'request' ? `Submitted by ${activeItem.data.name}` : `Reported by ${activeItem.data.reporterName}`}
                    </p>
                  </div>
                  <button onClick={() => setActiveItem(null)} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                    <CloseIcon />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  {/* content kept same */}
                  <div className="space-y-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Message Content</h3>
                      <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                        {activeItem.type === 'request' ? activeItem.data.message : activeItem.data.postContent}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {activeItem.type === 'request' ? (
                          <>
                            <div className="p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                              <span className="block text-xs text-slate-500 mb-1">Company / Institute</span>
                              <span className="font-medium text-slate-800">{activeItem.data.company || '—'}</span>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                              <span className="block text-xs text-slate-500 mb-1">Contact</span>
                              <span className="font-medium text-slate-800">{activeItem.data.phone || '—'}</span>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                              <span className="block text-xs text-slate-500 mb-1">Email</span>
                              <span className="font-medium text-slate-800">{activeItem.data.email}</span>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                              <span className="block text-xs text-slate-500 mb-1">Date</span>
                              <span className="font-medium text-slate-800">{activeItem.data.date}</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                              <span className="block text-xs text-slate-500 mb-1">Reason</span>
                              <span className="font-medium text-rose-600">{activeItem.data.reason}</span>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                              <span className="block text-xs text-slate-500 mb-1">Type</span>
                              <span className="font-medium text-slate-800">{activeItem.data.reportType}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                  <button onClick={() => setActiveItem(null)} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-white transition-colors">
                    Cancel
                  </button>
                  {activeItem.type === 'request' ? (
                    <>
                      <button onClick={() => { handleSingleAction(activeItem.data.id, 'rejected'); setActiveItem(null); }} className="px-5 py-2.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 font-medium transition-colors">
                        Reject
                      </button>
                      <button onClick={() => { handleSingleAction(activeItem.data.id, 'accepted'); setActiveItem(null); }} className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-medium shadow-lg shadow-emerald-500/30 transition-all">
                        Accept Request
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { dismissReport(activeItem.data.id); setActiveItem(null); }} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 font-medium hover:bg-slate-300 transition-colors">
                        Dismiss
                      </button>
                      <button onClick={() => { deletePostAndNotify(activeItem.data.id, activeItem.data.postId, activeItem.data.reporterId); setActiveItem(null); }} className="px-5 py-2.5 rounded-xl bg-rose-600 text-white hover:bg-rose-700 font-medium shadow-lg shadow-rose-500/30 transition-all">
                        Delete Post
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="fixed bottom-6 right-6 z-50 animate-bounce">
              <div className="bg-white border-l-4 border-rose-500 shadow-2xl rounded-r-lg p-4 flex items-center pr-8">
                <span className="text-rose-500 mr-3"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Error</h4>
                  <p className="text-slate-600 text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

/* --- helpers: mockRequests, mockReports, capitalize (unchanged) --- */
function mockRequests() {
  const now = new Date();
  return Array.from({ length: 21 }).map((_, i) => {
    const types = ["mentorship", "internship", "job"];
    const type = types[i % types.length];
    return {
      id: `r_${i + 1}`,
      type,
      title: `${capitalize(type)} Request — ${i + 1}`,
      name: ["Priya Sharma", "Aman Verma", "Sneha Gupta"][i % 3],
      email: `user${i + 1}@example.com`,
      company: i % 2 === 0 ? `Company ${i + 10}` : `Institute ${i + 5}`,
      phone: `+91-9${Math.floor(100000000 + Math.random() * 900000000)}`,
      message: "This is a sample message sent by the user. Replace with real data from your backend.",
      date: now.toISOString().slice(0, 10),
      status: i % 4 === 0 ? "accepted" : i % 5 === 0 ? "rejected" : "pending",
    };
  });
}

function mockReports() {
  const now = new Date();
  return Array.from({ length: 7 }).map((_, i) => ({
    id: `rep_${i + 1}`,
    postId: `p_${100 + i}`,
    postType: ["mentorship", "internship", "job"][i % 3],
    postTitle: `Offensive post ${i + 1}`,
    postContent: "Example post content that might violate the rules.",
    reporterId: `u_${200 + i}`,
    reporterName: ["Ravi", "Sonal", "Karan", "Neha", "Maya", "Amit", "Zoya"][i % 7],
    reportType: ["spam", "abuse", "other"][i % 3],
    reason: "Contains inappropriate language and spam links.",
    date: now.toISOString().slice(0, 10),
  }));
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
