// import React, { useEffect, useState, useMemo } from "react";
// import StatCard from "./StatCard.jsx";
// // import RequestCard from "./Requestcard.jsx"; 
// // import ReportsList from "./ReportList.jsx"; 
// import FilterPill from "./FilterPill.jsx";
// // import { mockRequests, mockReports } from "./mockData.js";
// import { LogoutIcon, SearchIcon, StatIconTotal, StatIconPending, StatIconReport } from "./icons.jsx";

// export default function MobileAdminDashboard() {


//   // --- Enforce Light Mode ---
//   useEffect(() => {
//     document.documentElement.classList.add("light");
//     document.documentElement.classList.remove("dark");
//   }, []);

//   // --- State ---
//   const [view, setView] = useState("requests");
//   const [requests, setRequests] = useState([]);
//   const [reports, setReports] = useState([]); 
//   const [query, setQuery] = useState("");
//   const [typeFilter, setTypeFilter] = useState("all"); 
//   const [statusFilter, setStatusFilter] = useState("pending"); 
//   const [selectedIds, setSelectedIds] = useState(new Set());

//   // --- Load Data ---
// //   useEffect(() => {
// //     setRequests(mockRequests());
// //     setReports(mockReports());
// //   }, []);

//   // --- Calculations ---
//   const total = requests.length;
//   const pending = requests.filter(r => r.status === 'pending').length;
//   const reportCount = reports.length;

//   const filteredRequests = useMemo(() => {
//     let list = requests;
//     if (typeFilter !== "all") list = list.filter((r) => r.type === typeFilter);
//     if (statusFilter !== "all") list = list.filter((r) => r.status === statusFilter);
//     if (query) list = list.filter(r => r.title.toLowerCase().includes(query.toLowerCase()));
//     return list;
//   }, [requests, query, typeFilter, statusFilter]);

//   const handleLogout = () => {
//         // Clear admin flags and token, then redirect to login
//         localStorage.removeItem('admin_token');
//         localStorage.removeItem('isAdminLoggedIn');
//         console.log("Logging out...");
//         window.location.href = "/admin/login";
//   };

//   const toggleSelect = (id) => {
//     const next = new Set(selectedIds);
//     if (next.has(id)) next.delete(id); else next.add(id);
//     setSelectedIds(next);
//   };

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] font-sans pb-24">

//       {/* Header */}
//       <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 px-4 py-3 flex justify-between items-center shadow-sm">
//         <div className="flex items-center gap-3">
//             <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-sm shadow-indigo-200 shadow-lg">
//                 AL
//             </div>
//             <div>
//               <h1 className="font-bold text-slate-800 leading-none text-base">Admin</h1>
//               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Mobile Dashboard</p>
//             </div>
//         </div>
//         <button onClick={handleLogout} className="p-2 bg-slate-50 text-slate-400 rounded-full hover:bg-rose-50 hover:text-rose-500 transition-colors border border-slate-100">
//             <LogoutIcon />
//         </button>
//       </div>

//       {/* Content */}
//       <div className="pt-5 pb-2 space-y-5">

//         {/* Stats Row */}
//         <div className="px-4 grid grid-cols-3 gap-2">
//             <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col items-center">
//                 <StatIconTotal />
//                 <span className="text-xl font-bold text-slate-800 mt-1">{total}</span>
//                 <span className="text-[10px] text-slate-400 font-bold uppercase">Total</span>
//             </div>
//             <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col items-center">
//                 <StatIconPending />
//                 <span className="text-xl font-bold text-slate-800 mt-1">{pending}</span>
//                 <span className="text-[10px] text-slate-400 font-bold uppercase">Pending</span>
//             </div>
//             <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm flex flex-col items-center">
//                 <StatIconReport />
//                 <span className="text-xl font-bold text-slate-800 mt-1">{reportCount}</span>
//                 <span className="text-[10px] text-slate-400 font-bold uppercase">Reports</span>
//             </div>
//         </div>

//         {/* View Switcher */}
//         <div className="px-4">
//             <div className="flex p-1 bg-white rounded-2xl shadow-sm border border-slate-100">
//                 <button onClick={() => setView('requests')} className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${view === 'requests' ? 'bg-indigo-50 text-indigo-600 shadow-sm' : 'text-slate-400'}`}>Requests</button>
//                 <button onClick={() => setView('reports')} className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${view === 'reports' ? 'bg-rose-50 text-rose-600 shadow-sm' : 'text-slate-400'}`}>Reports</button>
//             </div>
//         </div>

//         {/* Search & Filters (Only for Requests) */}
//         {view === 'requests' && (
//             <>
//                 <div className="px-4">
//                     <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><SearchIcon /></div>
//                         <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="block w-full pl-11 pr-4 py-3.5 border-none rounded-2xl bg-white text-slate-800 shadow-sm placeholder-slate-400 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all font-medium" />
//                     </div>
//                 </div>

//                 <div className="flex flex-col gap-1">
//                     <p className="px-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</p>
//                     <div className="flex gap-3 overflow-x-auto px-4 pb-2 -mx-0 w-full no-scrollbar" style={{ scrollbarWidth: 'none' }}>
//                         <FilterPill label="All Types" value="all" activeValue={typeFilter} onClick={setTypeFilter} />
//                         <FilterPill label="Mentorships" value="mentorship" activeValue={typeFilter} onClick={setTypeFilter} />
//                         <FilterPill label="Internships" value="internship" activeValue={typeFilter} onClick={setTypeFilter} />
//                         <FilterPill label="Jobs" value="job" activeValue={typeFilter} onClick={setTypeFilter} />
//                     </div>
//                 </div>

//                 <div className="flex flex-col gap-1">
//                     <p className="px-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
//                     <div className="flex gap-3 overflow-x-auto px-4 pb-2 -mx-0 w-full no-scrollbar" style={{ scrollbarWidth: 'none' }}>
//                         <FilterPill label="Pending" value="pending" activeValue={statusFilter} onClick={setStatusFilter} colorClass="bg-amber-500 border-amber-500" />
//                         <FilterPill label="Approved" value="approved" activeValue={statusFilter} onClick={setStatusFilter} colorClass="bg-emerald-500 border-emerald-500" />
//                         <FilterPill label="Rejected" value="rejected" activeValue={statusFilter} onClick={setStatusFilter} colorClass="bg-rose-500 border-rose-500" />
//                         <FilterPill label="All Status" value="all" activeValue={statusFilter} onClick={setStatusFilter} />
//                     </div>
//                 </div>
//             </>
//         )}
//       </div>

//       {/* List Content */}
//       <div className="px-4 space-y-4 min-h-[50vh]">
//         {view === 'requests' ? (
//             filteredRequests.length > 0 ? (
//                 filteredRequests.map(r => (
//                     <div key={r.id} className="animate-enter">
//                         <RequestCard 
//                             r={r} 
//                             selectedIds={selectedIds}
//                             toggleSelect={toggleSelect}
//                             handleSingleAction={() => {}} 
//                             setActiveItem={() => {}} 
//                         />
//                     </div>
//                 ))
//             ) : (
//                 <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
//                     <SearchIcon />
//                     <p className="text-slate-500 font-medium mt-2">No items found</p>
//                 </div>
//             )
//         ) : (
//             <ReportsList 
//                 reports={reports}
//                 deletePostAndNotify={() => {}}
//                 dismissReport={() => {}}
//                 sendReportNotification={() => {}}
//                 setActiveItem={() => {}}
//             />
//         )}
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useState } from "react";
import { Briefcase, CheckCircle, XCircle, Loader2, LogOut } from "lucide-react";

export default function MobileAdminDashboard() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Enforce light mode
    useEffect(() => {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
    }, []);

    // Fetch pending jobs
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/jobs/admin/pending");


                if (!res.ok) throw new Error("Failed to load jobs");

                const data = await res.json();
                setJobs(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error(err);
                setError("Unable to load job requests");
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const updateJobStatus = async (jobId, status) => {
        try {
            //   await fetch("/api/jobs/admin/status", {
            //     method: "PUT",
            //     headers: { "Content-Type": "application/json" },
            //     credentials: "include",
            //     body: JSON.stringify({ jobId, status }),
            //   });

            await fetch("http://localhost:8000/api/jobs/admin/status", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ jobId, status }),
            });


            // Remove job from list
            setJobs(prev => prev.filter(job => job._id !== jobId));
        } catch (err) {
            alert("Failed to update job status");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("isAdminLoggedIn");
        window.location.href = "/admin/login";
    };

    // Loading
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-slate-500">
                <Loader2 className="animate-spin mr-2" />
                Loading job requests...
            </div>
        );
    }

    // Error
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-rose-600">
                {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-white border-b border-slate-100 px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Briefcase className="text-indigo-600" />
                    <h1 className="font-bold text-slate-800 text-base">
                        Job Requests
                    </h1>
                </div>
                <button onClick={handleLogout} className="text-rose-500">
                    <LogOut size={20} />
                </button>
            </div>

            {/* Job List */}
            <div className="p-4 space-y-4">
                {jobs.length === 0 ? (
                    <div className="text-center text-slate-400 py-20">
                        No pending job requests 🎉
                    </div>
                ) : (
                    jobs.map(job => (
                        <div
                            key={job._id}
                            className="bg-white rounded-xl border border-slate-100 shadow-sm p-4"
                        >
                            <h2 className="font-semibold text-slate-800">
                                {job.title}
                            </h2>
                            <p className="text-sm text-slate-500 mb-2">
                                {job.company}
                            </p>

                            <p className="text-sm text-slate-600 line-clamp-3 mb-3">
                                {job.description}
                            </p>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => updateJobStatus(job._id, "approved")}
                                    className="flex-1 flex items-center justify-center gap-1 bg-emerald-500 text-white py-2 rounded-lg text-sm font-semibold"
                                >
                                    <CheckCircle size={14} />
                                    Approve
                                </button>
                                <button
                                    onClick={() => updateJobStatus(job._id, "rejected")}
                                    className="flex-1 flex items-center justify-center gap-1 bg-rose-500 text-white py-2 rounded-lg text-sm font-semibold"
                                >
                                    <XCircle size={14} />
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
