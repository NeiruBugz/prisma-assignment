import React from 'react';
import logo from '../../assets/logo.svg';

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <section className="sidebar__user">
        <img src={logo} alt="user-icon" className="sidebar__image" />
        <span className="sidebar__username">Nail Badiullin</span>
        <span className="sidebar__userlabel">Test Assignment</span>
      </section>
    </aside>
  );
};
