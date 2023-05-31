import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Analytics from "../Pages/Analytics/Analytics";
import Country from "../Pages/Country/Histogram"
import Dashboard from "../Pages/Dashboard/Dashboard"
import Topics from "../Pages/Topics/Topics"
import Intensity from "../Pages/Intensity/Intensity"

const router = createBrowserRouter([
   {
      path: "/",
      element: <DashboardLayout />,
      errorElement: <p>Hello Error</p>,
      children: [
         {
            path: "/",
            element: <Dashboard/>
         },
         {
            path: "/dashboard/analytics",
            element: <Analytics/>
         },
         {
            path: "/dashboard/country",
            element: <Country/>
         },
         {
            path: "/dashboard/topics",
            element: <Topics/>
         },
         {
            path: "/dashboard/intensity",
            element: <Intensity/>
         },
      ]
   }
])

export default router;
