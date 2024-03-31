import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function SidebarLinkGroup({
  children,
  activecondition,
  toLink
}) {

  const [open, setOpen] = useState(activecondition);

  const handleClick = () => {
    setOpen(!open);
  }

  return (
    <NavLink
      to="/Orders"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${activecondition && 'bg-slate-900'}`}>
        {children(handleClick, open)}
      </li>
    </NavLink>
  );
}

export default SidebarLinkGroup;