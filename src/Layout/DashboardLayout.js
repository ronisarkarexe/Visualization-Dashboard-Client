import React from 'react';
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
   return (
      <>
         <div className="drawer drawer-mobile">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content bg-slate-200 p-5">
               <Outlet/>
            </div> 
            <div className="drawer-side bg-slate-300">
               <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
               <ul className="menu p-4 w-80 text-base-content">
                  <h2 className="text-3xl font-medium ml-3 mb-2.5">DASHBOARD</h2>
                  <li><Link to="/">Dashboard</Link></li>
                  <li><Link to="/dashboard/analytics">Analytics</Link></li>
                  {/* <li><Link to="/dashboard/country">Country</Link></li>
                  <li><Link to="/dashboard/topics">Topics</Link></li> */}
                  <li><Link to="/dashboard/intensity">Intensity</Link></li>
               </ul>
            </div>
            </div>
      </>
   );
};

export default DashboardLayout;