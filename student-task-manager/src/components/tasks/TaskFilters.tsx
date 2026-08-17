import React from "react";
import type {
	TaskFilters,
	TaskCategory,
	TaskPriority,
	TaskStatus,
} from "../../types/task";
import "./TaskFilters.css";

interface TaskFiltersProps {
	filters: TaskFilters;
	onFilterChange: (filters: TaskFilters) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
	filters,
	onFilterChange,
}) => {
	const categories: TaskCategory[] = [
		"School",
		"Assignment",
		"Project",
		"Personal",
		"Exam",
	];
	const priorities: TaskPriority[] = ["Low", "Medium", "High"];
	const statuses: TaskStatus[] = ["Todo", "In Progress", "Completed"];

	const handleFilterChange = (key: keyof TaskFilters, value: string) => {
		const newFilters = { ...filters };
		if (value === "all") {
			delete newFilters[key];
		} else {
			newFilters[key] = value as any;
		}
		onFilterChange(newFilters);
	};

	return (
		<div className="task-filters">
			<div className="filter-group">
				<label htmlFor="status-filter">Status:</label>
				<select
					id="status-filter"
					value={filters.status || "all"}
					onChange={(e) => handleFilterChange("status", e.target.value)}
					aria-label="Filter by status"
				>
					<option value="all">All</option>
					{statuses.map((status) => (
						<option key={status} value={status}>
							{status}
						</option>
					))}
				</select>
			</div>

			<div className="filter-group">
				<label htmlFor="priority-filter">Priority:</label>
				<select
					id="priority-filter"
					value={filters.priority || "all"}
					onChange={(e) => handleFilterChange("priority", e.target.value)}
					aria-label="Filter by priority"
				>
					<option value="all">All</option>
					{priorities.map((priority) => (
						<option key={priority} value={priority}>
							{priority}
						</option>
					))}
				</select>
			</div>

			<div className="filter-group">
				<label htmlFor="category-filter">Category:</label>
				<select
					id="category-filter"
					value={filters.category || "all"}
					onChange={(e) => handleFilterChange("category", e.target.value)}
					aria-label="Filter by category"
				>
					<option value="all">All</option>
					{categories.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};
