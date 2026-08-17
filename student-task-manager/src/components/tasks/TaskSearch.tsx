import React, { useState, useCallback } from "react";
import "./TaskSearch.css";

interface TaskSearchProps {
	onSearch: (query: string) => void;
}

export const TaskSearch: React.FC<TaskSearchProps> = ({ onSearch }) => {
	const [value, setValue] = useState("");

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value;
			setValue(newValue);
			onSearch(newValue);
		},
		[onSearch],
	);

	return (
		<div className="task-search">
			<input
				type="text"
				className="task-search-input"
				placeholder="Search tasks by title or description..."
				value={value}
				onChange={handleChange}
				aria-label="Search tasks"
			/>
		</div>
	);
};
