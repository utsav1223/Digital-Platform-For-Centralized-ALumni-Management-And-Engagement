import React from "react";

/**
 * ReportsList.jsx
 * Props:
 * - reports: array of report objects
 * - deletePostAndNotify(reportId, postId, reporterUserId)
 * - dismissReport(reportId)
 * - sendReportNotification(userId, type, reason)
 * - setActiveItem({ type: 'report', data: rep })
 */
export default function ReportsList({
  reports = [],
  deletePostAndNotify,
  dismissReport,
  sendReportNotification,
  setActiveItem,
}) {
  return (
    <div className="space-y-4">
      {reports.length === 0 && (
        <div className="text-center py-8 text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-slate-900/60 rounded-xl">
          No reports
        </div>
      )}

      {reports.map((rep) => (
        <div
          key={rep.id}
          className="bg-white dark:bg-slate-900 rounded-xl p-4 shadow flex items-start gap-4"
        >
          <div
            className="w-2.5 rounded-full shrink-0"
            style={{ background: accentFor(rep.postType) }}
          />
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  {rep.postTitle}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Reported by: {rep.reporterName} • Type: {rep.reportType}
                </div>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{rep.date}</div>
            </div>

            <div className="mt-2 text-sm text-slate-700 dark:text-slate-200">
              <strong className="block text-slate-800 dark:text-slate-100">Reason:</strong>
              <div className="mt-1">{rep.reason}</div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveItem({ type: "report", data: rep })}
                className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:opacity-95"
              >
                View
              </button>

              <button
                type="button"
                onClick={() => deletePostAndNotify(rep.id, rep.postId, rep.reporterId)}
                className="px-3 py-2 rounded-lg bg-rose-500 text-white hover:opacity-95"
              >
                Delete Post
              </button>

              <button
                type="button"
                onClick={() => dismissReport(rep.id)}
                className="px-3 py-2 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 hover:opacity-95"
              >
                Dismiss
              </button>

              <button
                type="button"
                onClick={() => sendReportNotification(rep.reporterId, rep.reportType, rep.reason)}
                className="px-3 py-2 rounded-lg bg-amber-400 text-slate-900 hover:opacity-95"
              >
                Notify
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* --- local helper --- */
function accentFor(type) {
  // returns a plain color (not CSS gradient) so it works safely as a background value
  switch (type) {
    case "mentorship":
      return "#10b981"; // emerald
    case "internship":
      return "#f59e0b"; // amber
    case "job":
      return "#7c3aed"; // violet
    default:
      return "#64748b"; // slate
  }
}
