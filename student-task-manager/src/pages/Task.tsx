import React, { useState, useEffect } from "react";
import { taskService } from "../services/taskService";
import type { Task, TaskFilters, TaskSort } from "../types/task";
import { TaskList } from "../components/tasks/TaskList";
import { TaskFilters as FilterComponent } from "../components/tasks/TaskFilters";
import { TaskSearch } from "../components/tasks/TaskSearch";
import { TaskSort as SortComponent } from "../components/tasks/TaskSort";
// import { AddTaskButton } from "../components/tasks/AddTaskButton";
import { TaskFormDialog } from "../components/forms/TaskFormDialog";

import "./Tasks.css";
import { Pagination } from "../components/tasks/Pagination";

export const Tasks: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [filters, setFilters] = useState<TaskFilters>({});
	const [sort, setSort] = useState<TaskSort>({
		field: "dueDate",
		direction: "asc",
	});
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editingTask, setEditingTask] = useState<Task | undefined>();
    const [currentPage, setCurrentPage] = useState(1);
	const tasksPerPage = 5;


	useEffect(() => {
		loadTasks();
	}, []);

	useEffect(() => {
		applyFiltersAndSort();
	}, [tasks, filters, sort]);

     useEffect(() => {
				setCurrentPage(1);
			}, [filters, sort]);

    
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
const paginatedTasks = filteredTasks.slice(
	(currentPage - 1) * tasksPerPage,
	currentPage * tasksPerPage,
);
	const applyFiltersAndSort = () => {
		let result = taskService.filter(tasks, filters);
		result = taskService.sort(result, sort);
		setFilteredTasks(result);
	};

	const handleCreateTask = async (taskData: Omit<Task, "id" | "createdAt">) => {
		await taskService.create(taskData);
		await loadTasks();
	};

	const handleUpdateTask = async (taskData: Partial<Task>) => {
		if (editingTask) {
			await taskService.update(editingTask.id, taskData);
			await loadTasks();
			setEditingTask(undefined);
		}
	};

	const handleDeleteTask = async (id: string) => {
		if (window.confirm("Are you sure you want to delete this task?")) {
			await taskService.delete(id);
			await loadTasks();
		}
	};

	const handleEditTask = (task: Task) => {
		setEditingTask(task);
		setIsFormOpen(true);
	};

	const handleStatusChange = async (id: string, status: Task["status"]) => {
		await taskService.update(id, { status });
		await loadTasks();
	};

   

	return (
		<div className="tasks-page">
			<div className="tasks-header">
				<div>
					<h1>Tasks</h1>
					<p className="tasks-subtitle">
						Manage your academic and personal tasks
					</p>
				</div>
				{/* <AddTaskButton onClick={() => setIsFormOpen(true)} /> */}
			</div>

			<div className="tasks-controls">
				<TaskSearch onSearch={(search) => setFilters({ ...filters, search })} />
				<div className="tasks-controls-group">
					<FilterComponent filters={filters} onFilterChange={setFilters} />
					<SortComponent sort={sort} onSortChange={setSort} />
				</div>
			</div>

			{loading ? (
				<div className="tasks-loading">Loading tasks...</div>
			) : error ? (
				<div className="tasks-error">{error}</div>
			) : (
				<TaskList
					tasks={paginatedTasks}
					onEdit={handleEditTask}
					onDelete={handleDeleteTask}
					onStatusChange={handleStatusChange}
				/>
			)}

			<TaskFormDialog
				isOpen={isFormOpen}
				onClose={() => {
					setIsFormOpen(false);
					setEditingTask(undefined);
				}}
				onSubmit={(data: Partial<Task>) => {
					if (editingTask) {
						void handleUpdateTask(data);
					} else {
						void handleCreateTask(
							data as Omit<Task, "id" | "createdAt">,
						);
					}
				}}
				initialData={editingTask}
			/>
			<Pagination
				currentPage={currentPage}
				totalPages={Math.ceil(filteredTasks.length / tasksPerPage)}
				onPageChange={setCurrentPage}
			/>
		</div>
	);
};
