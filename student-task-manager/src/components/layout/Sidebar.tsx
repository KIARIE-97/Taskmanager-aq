import React from "react";
import { NavLink } from "react-router-dom";

export const Sidebar: React.FC = () => {
	return (
		<aside className="sidebar">
			<div className="sidebar-header">
				<h1>Student Task Manager</h1>
			</div>
			<nav className="sidebar-nav">
				<NavLink to="/" className="nav-link">
					Dashboard
				</NavLink>
				<NavLink to="/tasks" className="nav-link">
					Tasks
				</NavLink>
				<div className="nav-section">
					<h3>Quick Filters</h3>
					<NavLink to="/tasks?status=Todo" className="nav-link">
						Pending
					</NavLink>
					<NavLink to="/tasks?status=In%20Progress" className="nav-link">
						In Progress
					</NavLink>
					<NavLink to="/tasks?status=Completed" className="nav-link">
						Completed
					</NavLink>
				</div>
				<NavLink to="/settings" className="nav-link">
					Settings
				</NavLink>
			</nav>
		</aside>
	);
};
