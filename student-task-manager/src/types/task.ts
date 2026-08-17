export type TaskCategory =
	| "School"
	| "Assignment"
	| "Project"
	| "Personal"
	| "Exam";
export type TaskPriority = "Low" | "Medium" | "High";
export type TaskStatus = "Todo" | "In Progress" | "Completed";

export interface Task {
	id: string;
	title: string;
	description: string;
	category: TaskCategory;
	priority: TaskPriority;
	status: TaskStatus;
	dueDate: string;
	createdAt: string;
	updatedAt?: string;
}

export interface TaskFilters {
	status?: TaskStatus;
	priority?: TaskPriority;
	category?: TaskCategory;
	search?: string;
}

export interface TaskSort {
	field: "title" | "dueDate" | "priority";
	direction: "asc" | "desc";
}
