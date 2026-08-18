import type { Task, TaskFilters, TaskSort } from "../types/task";
import { seedTasks } from "../data/seedTask";

let tasks = [...seedTasks];

export const taskService = {
	// Simulate async API calls
	async getAll(): Promise<Task[]> {
		return new Promise((resolve) => {
			setTimeout(() => resolve([...tasks]), 500);
		});
	},

	async create(task: Omit<Task, "id" | "createdAt">): Promise<Task> {
		const newTask: Task = {
			...task,
			id: Date.now().toString(),
			createdAt: new Date().toISOString(),
		};
		tasks = [newTask, ...tasks];
		return new Promise((resolve) => {
			setTimeout(() => resolve(newTask), 300);
		});
	},

	async update(id: string, updates: Partial<Task>): Promise<Task> {
		const index = tasks.findIndex((t) => t.id === id);
		if (index === -1) throw new Error("Task not found");

		tasks[index] = {
			...tasks[index],
			...updates,
			updatedAt: new Date().toISOString(),
		};
		return new Promise((resolve) => {
			setTimeout(() => resolve(tasks[index]), 300);
		});
	},

	async delete(id: string): Promise<void> {
		tasks = tasks.filter((t) => t.id !== id);
		return new Promise((resolve) => {
			setTimeout(resolve, 300);
		});
	},

	// Filtering and sorting utilities
	filter(tasks: Task[], filters: TaskFilters): Task[] {
		let result = [...tasks];

		if (filters.search) {
			const search = filters.search.toLowerCase();
			result = result.filter(
				(t) =>
					t.title.toLowerCase().includes(search) ||
					t.description.toLowerCase().includes(search),
			);
		}

		if (filters.status) {
			result = result.filter((t) => t.status === filters.status);
		}

		if (filters.priority) {
			result = result.filter((t) => t.priority === filters.priority);
		}

		if (filters.category) {
			result = result.filter((t) => t.category === filters.category);
		}

		return result;
	},

	sort(tasks: Task[], sort: TaskSort): Task[] {
		const priorityOrder = { Low: 0, Medium: 1, High: 2 };
		const result = [...tasks];

		result.sort((a, b) => {
			let comparison = 0;

			switch (sort.field) {
				case "title":
					comparison = a.title.localeCompare(b.title);
					break;
				case "dueDate":
					comparison =
						new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
					break;
				case "priority":
					comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
					break;
			}

			return sort.direction === "asc" ? comparison : -comparison;
		});

		return result;
	},
};
