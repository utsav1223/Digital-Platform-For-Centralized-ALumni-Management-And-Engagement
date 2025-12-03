import React from "react";
// Adjust this path to wherever your main Desktop Dashboard file is located:
import AdminDashboard from "../admin-dashboard.jsx"; 
import MobileAdminDashboard from "./mobile-adminDashboard.jsx";

export default function Switcher() {
  return (
    <>
      {/* Desktop View:
        - Hidden on small screens (hidden)
        - Visible on Large screens (lg:block) 
      */}
      <div className="hidden lg:block">
        <AdminDashboard />
      </div>

      {/* Mobile View:
        - Visible on small screens (block)
        - Hidden on Large screens (lg:hidden) 
      */}
      <div className="block lg:hidden">
        <MobileAdminDashboard />
      </div>
    </>
  );
}