// src/pages/Dashboard.tsx
import React, { useState, useEffect } from "react";
import { taskService } from "../services/taskService";
import type { Task } from "../types/task";
import { SummaryCard } from "../components/dashboard/SummaryCard";
import "./Dashboard.css";

export const Dashboard: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadTasks = async () => {
			try {
				setLoading(true);
				const data = await taskService.getAll();
				setTasks(data);
				setError(null);
			} catch (err) {
				setError("Failed to load tasks");
			} finally {
				setLoading(false);
			}
		};
		loadTasks();
	}, []);

	// Derived statistics
	const total = tasks.length;
	const pending = tasks.filter((t) => t.status === "Todo").length;
	const inProgress = tasks.filter((t) => t.status === "In Progress").length;
	const completed = tasks.filter((t) => t.status === "Completed").length;
	const highPriority = tasks.filter((t) => t.priority === "High").length;

	if (loading) {
		return <div className="dashboard-loading">Loading dashboard...</div>;
	}

	if (error) {
		return <div className="dashboard-error">{error}</div>;
	}

	return (
		<div className="dashboard">
			<header className="dashboard-header">
				<h1>Dashboard</h1>
				<p>Overview of your tasks</p>
			</header>

			<div className="summary-grid">
				<SummaryCard title="Total Tasks" value={total} icon="📋" />
				<SummaryCard
					title="Pending"
					value={pending}
					icon="⏳"
					variant="warning"
				/>
				<SummaryCard
					title="In Progress"
					value={inProgress}
					icon="🔄"
					variant="info"
				/>
				<SummaryCard
					title="Completed"
					value={completed}
					icon="✅"
					variant="success"
				/>
				<SummaryCard
					title="High Priority"
					value={highPriority}
					icon="🔴"
					variant="danger"
				/>
			</div>
		</div>
	);
};
