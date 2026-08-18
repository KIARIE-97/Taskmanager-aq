// src/components/tasks/TaskList.tsx
import React from "react";
import type { Task } from "../../types/task";
import { TaskItem } from "./TaskItem";
import "./TaskList.css";

interface TaskListProps {
	tasks: Task[];
	onEdit: (task: Task) => void;
	onDelete: (id: string) => void;
	onStatusChange: (id: string, status: Task["status"]) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
	tasks,
	onEdit,
	onDelete,
	onStatusChange,
}) => {
	if (tasks.length === 0) {
		return (
			<div className="task-list-empty">
				<p>No tasks found</p>
				<p className="task-list-empty-sub">Try adjusting your filters</p>
			</div>
		);
	}

	return (
		<div className="task-list">
			<div className="task-list-header">
				<span className="task-col-title">Task</span>
				<span className="task-col-category">Category</span>
				<span className="task-col-priority">Priority</span>
				<span className="task-col-status">Status</span>
				<span className="task-col-due">Due Date</span>
				<span className="task-col-actions">Actions</span>
			</div>
			{tasks.map((task) => (
				<TaskItem
					key={task.id}
					task={task}
					// void={undefined}
					onEdit={onEdit}
					onDelete={onDelete}
					onStatusChange={onStatusChange}
				/>
			))}
		</div>
	);
};
