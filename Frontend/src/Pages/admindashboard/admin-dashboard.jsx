// AdminDashboard.jsx
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
/* ---  --- */
import { 
  Search, X, ChevronDown, LayoutGrid, 
  Clock, AlertCircle, Trash2, CheckCircle, 
  XCircle, Filter, MapPin, DollarSign, 
  Briefcase, Code2 
} from "lucide-react";

import Sidebar from "./admin-components/sidebar.jsx";
import RequestCard from "./admin-components/Requestcard.jsx";
import ReportsList from "./admin-components/ReportList.jsx";

/* --- UI Components --- */
const SelectInput = ({ children, ...props }) => (
  <div className="relative">
    <select {...props} className="appearance-none w-full bg-white border border-slate-200 text-slate-700 py-2.5 px-4 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium cursor-pointer shadow-sm">
      {children}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
      <ChevronDown size={16} />
    </div>
  </div>
);

const StatCard = ({ title, count, icon: Icon, colorClass }) => (
  <div className="flex items-center p-4 bg-white rounded-xl border border-white shadow-lg shadow-slate-200/50">
    <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10 text-${colorClass.split('-')[1]}-600`}>
      <Icon size={24} />
    </div>
    <div className="ml-4">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">{title}</p>
      <p className="text-2xl font-bold text-slate-800">{count}</p>
    </div>
  </div>
);

export default function AdminDashboard() {
  const navigate = useNavigate();

  // --- Router guard ---
  useEffect(() => {
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
  }, [navigate]);

  // --- Enforce Light Mode ---
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

  // Data loading
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

  // Filtering
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
  const pagedRequests = useMemo(
    () => filteredRequests.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredRequests, page]
  );

  useEffect(() => setPage(1), [typeFilter, statusFilter, query]);

  // Handlers
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

  const total = useMemo(() => requests.length, [requests]);
  const pending = useMemo(() => requests.filter((r) => r.status === "pending").length, [requests]);
  const reportCount = useMemo(() => reports.length, [reports]);
  
  return (
    <div className="min-h-screen font-sans bg-[#F1F5F9] relative overflow-hidden">
      {/* Background Decor */}
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
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                  {view === "requests" ? "Request Board" : "Report Center"}
                </h1>
                <p className="mt-1 text-slate-500 font-medium">
                  {view === "requests" ? "Manage incoming mentorship and job applications." : "Review flagged content and maintain community guidelines."}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full md:w-auto">
                <StatCard title="Total" count={total} icon={LayoutGrid} colorClass="bg-indigo-500" />
                <StatCard title="Pending" count={pending} icon={Clock} colorClass="bg-amber-500" />
                <StatCard title="Reports" count={reportCount} icon={AlertCircle} colorClass="bg-rose-500" />
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-xl p-4 rounded-2xl shadow-sm border border-white flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:max-w-md group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Search size={20} />
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
                  <option value="event">Events</option>
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
                    <button onClick={() => handleBulkAction("accepted")} className="flex items-center gap-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                      <CheckCircle size={16} /> Accept ({selectedIds.size})
                    </button>
                    <button onClick={() => handleBulkAction("rejected")} className="flex items-center gap-1 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
                      <XCircle size={16} /> Reject ({selectedIds.size})
                    </button>
                  </div>
                )}

                <button
                  onClick={() => { setPage(1); setQuery(""); setTypeFilter("all"); setStatusFilter("pending"); }}
                  className="p-2.5 text-slate-500 hover:text-slate-700 hover:bg-white bg-slate-50 border border-transparent hover:border-slate-200 rounded-xl transition-all shadow-sm"
                  title="Reset Filters"
                >
                  <Filter size={20} />
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
                        <LayoutGrid size={64} className="mb-4 opacity-20" />
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
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setActiveItem(null)}></div>
              <div className="relative bg-white w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {activeItem.type === 'request' && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
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
                  <button onClick={() => setActiveItem(null)} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-6">
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Message Content</h3>
                      <p className="text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">
                        {activeItem.type === 'request' ? activeItem.data.message : activeItem.data.postContent}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {activeItem.type === 'request' ? (
                          <>
                            {/* --- New Details Section --- */}
                            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                              <span className="block text-xs text-slate-500 mb-1">Company / Institute</span>
                              <span className="font-medium text-slate-800 text-sm">{activeItem.data.company || '—'}</span>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                               <div className="flex items-center gap-1.5 mb-1 text-slate-500">
                                   <MapPin size={12} /> <span className="text-xs">Location</span>
                               </div>
                              <span className="font-medium text-slate-800 text-sm">{activeItem.data.location || 'Remote'}</span>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                               <div className="flex items-center gap-1.5 mb-1 text-slate-500">
                                   <DollarSign size={12} /> <span className="text-xs">Salary / Stipend</span>
                               </div>
                              <span className="font-medium text-slate-800 text-sm">{activeItem.data.salary || '—'}</span>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                               <div className="flex items-center gap-1.5 mb-1 text-slate-500">
                                   <Briefcase size={12} /> <span className="text-xs">Experience</span>
                               </div>
                              <span className="font-medium text-slate-800 text-sm">{activeItem.data.exp || '—'}</span>
                            </div>
                            
                            {/* Skills Row (Full Width) */}
                            <div className="col-span-2 p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                               <div className="flex items-center gap-1.5 mb-2 text-slate-500">
                                   <Code2 size={12} /> <span className="text-xs">Skills</span>
                               </div>
                               <div className="flex flex-wrap gap-2">
                                  {activeItem.data.skills && activeItem.data.skills.length > 0 ? (
                                    activeItem.data.skills.map((skill, i) => (
                                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium border border-slate-200">
                                        {skill}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-slate-400 text-xs italic">No specific skills listed</span>
                                  )}
                               </div>
                            </div>
                            
                            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                              <span className="block text-xs text-slate-500 mb-1">Contact Email</span>
                              <span className="font-medium text-slate-800 text-sm">{activeItem.data.email}</span>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                              <span className="block text-xs text-slate-500 mb-1">Date Submitted</span>
                              <span className="font-medium text-slate-800 text-sm">{activeItem.data.date}</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                              <span className="block text-xs text-slate-500 mb-1">Reason</span>
                              <span className="font-medium text-rose-600 text-sm">{activeItem.data.reason}</span>
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                              <span className="block text-xs text-slate-500 mb-1">Type</span>
                              <span className="font-medium text-slate-800 text-sm">{activeItem.data.reportType}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                  <button onClick={() => setActiveItem(null)} className="px-5 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-white transition-colors">
                    Cancel
                  </button>
                  {activeItem.type === 'request' ? (
                    <>
                      <button onClick={() => { handleSingleAction(activeItem.data.id, 'rejected'); setActiveItem(null); }} className="px-5 py-2.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold text-sm transition-colors border border-rose-100">
                        Reject
                      </button>
                      <button onClick={() => { handleSingleAction(activeItem.data.id, 'accepted'); setActiveItem(null); }} className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-semibold text-sm shadow-md shadow-indigo-500/20 transition-all">
                        Accept Request
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { dismissReport(activeItem.data.id); setActiveItem(null); }} className="px-5 py-2.5 rounded-lg bg-slate-200 text-slate-800 font-semibold text-sm hover:bg-slate-300 transition-colors">
                        Dismiss
                      </button>
                      <button onClick={() => { deletePostAndNotify(activeItem.data.id, activeItem.data.postId, activeItem.data.reporterId); setActiveItem(null); }} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 font-semibold text-sm shadow-md shadow-rose-500/20 transition-all">
                        <Trash2 size={16} /> Delete Post
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
                <span className="text-rose-500 mr-3"><AlertCircle size={24} /></span>
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

/* --- Improved Mock Generator --- */
function mockRequests() {
  const now = new Date();
  
  const techRoles = ["Senior Software Engineer", "Frontend Developer", "Backend Lead", "Full Stack Developer", "DevOps Engineer"];
  const internRoles = ["Product Design Intern", "Marketing Intern", "SDE Intern", "Data Science Intern"];
  const mentorshipTopics = ["Career Guidance", "Resume Review", "Mock Interview", "Startup Advice"];
  const eventTitles = ["Hackathon 2025", "Alumni Meetup", "Tech Talk: AI", "Networking Dinner"];
  
  const locations = ["Bangalore, India", "Mumbai, India", "Remote", "Delhi NCR", "Hyderabad, India", "San Francisco, USA"];
  const techSkills = ["React", "Node.js", "Python", "AWS", "Figma", "Docker", "Java", "System Design"];
  
  return Array.from({ length: 24 }).map((_, i) => {
    const types = ["mentorship", "internship", "job", "event"];
    const type = types[i % types.length];
    
    let title, salary, exp, skills;
    
    // Customize data based on type
    if (type === 'job') {
      title = techRoles[i % techRoles.length];
      salary = `₹${15 + (i%20)}L - ₹${25 + (i%20)}L`;
      exp = `${2 + (i%5)} - ${5 + (i%5)} Yrs`;
      skills = techSkills.slice(i % 3, (i % 3) + 3);
    } else if (type === 'internship') {
      title = internRoles[i % internRoles.length];
      salary = `₹${20 + (i%30)}k/mo`;
      exp = "Fresher";
      skills = techSkills.slice(0, 2);
    } else if (type === 'mentorship') {
      title = mentorshipTopics[i % mentorshipTopics.length];
      salary = "Unpaid";
      exp = "N/A";
      skills = ["Communication", "Leadership"];
    } else {
      title = eventTitles[i % eventTitles.length];
      salary = "N/A";
      exp = "Open to All";
      skills = [];
    }

    return {
      id: `r_${i + 1}`,
      type,
      title: title,
      name: ["Priya Sharma", "Aman Verma", "Sneha Gupta", "Rahul Raj", "Arjun Mehta", "Kavya Singh"][i % 6],
      email: `user${i + 1}@example.com`,
      company: i % 2 === 0 ? `TechCorp ${i + 10}` : `Institute ${i + 5}`,
      location: locations[i % locations.length],
      phone: `+91-9${Math.floor(100000000 + Math.random() * 900000000)}`,
      salary: salary,
      exp: exp,
      skills: skills,
      message: `We are looking for a ${title} to join our team. The candidate should be passionate about technology and innovation. Please review this request.`,
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