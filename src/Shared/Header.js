import React from 'react';
import { Link } from "react-router-dom"

const Header = () => {
   return (
      <div className="navbar bg-slate-400 flex justify-between">
            <div className="navbar-start">
                <Link to="/" className="normal-case text-xl">Dashboard</Link>
            </div>
        </div>
   );
};

export default Header;