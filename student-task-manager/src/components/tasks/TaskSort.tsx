import React from "react";
import type { TaskSort } from "../../types/task";
import "./TaskSort.css";

interface TaskSortProps {
	sort: TaskSort;
	onSortChange: (sort: TaskSort) => void;
}

export const TaskSort: React.FC<TaskSortProps> = ({ sort, onSortChange }) => {
	const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onSortChange({
			field: e.target.value as TaskSort["field"],
			direction: sort.direction,
		});
	};

	const handleDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onSortChange({
			field: sort.field,
			direction: e.target.value as "asc" | "desc",
		});
	};

	return (
		<div className="task-sort">
			<label htmlFor="sort-field">Sort by:</label>
			<select
				id="sort-field"
				value={sort.field}
				onChange={handleFieldChange}
				aria-label="Sort field"
			>
				<option value="title">Title</option>
				<option value="dueDate">Due Date</option>
				<option value="priority">Priority</option>
			</select>

			<select
				value={sort.direction}
				onChange={handleDirectionChange}
				aria-label="Sort direction"
			>
				<option value="asc">Ascending</option>
				<option value="desc">Descending</option>
			</select>
		</div>
	);
};
