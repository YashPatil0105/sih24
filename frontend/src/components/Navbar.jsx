import React, { useState } from "react";

import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav > 
      {/* <Link to="/" className="title">
      <h2 className="text-3xl font-bold text-green-400">GreenMines</h2>
      </Link> */}
      <Link to="/" className="title">
    <h2 className="text-3xl font-bold">
        <span className="text-green-400">Green</span>
        <span className="mines">Mines</span>
    </h2>
</Link>

      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/landingPage">LandingPage</NavLink>
        </li>
        <li>
          <NavLink to="/estimation">Estimation</NavLink>
        </li>
        <li>
          <NavLink to="/carbonNeutrality">CarbonNeutrality</NavLink>
        </li>
        <li>
          <NavLink to="/carbonNeutralitySimulator">Simulator</NavLink>
        </li>
      
        <li>
          <NavLink to="/carbonCredits">CarbonCredits</NavLink>
        </li>
      </ul>
    </nav>
  );
};
