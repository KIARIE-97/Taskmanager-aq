// src/components/forms/TaskFormDialog.tsx
import React, { useState, useEffect, useRef } from "react";
import type { Task, TaskCategory, TaskPriority, TaskStatus } from "../../types/task";
import "./TaskFormDialog.css";

interface TaskFormDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: Partial<Task>) => void;
	initialData?: Task;
}

interface FormErrors {
	title?: string;
	dueDate?: string;
}

export const TaskFormDialog: React.FC<TaskFormDialogProps> = ({
	isOpen,
	onClose,
	onSubmit,
	initialData,
}) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "Personal" as TaskCategory,
		priority: "Medium" as TaskPriority,
		status: "Todo" as TaskStatus,
		dueDate: "",
	});
	const [errors, setErrors] = useState<FormErrors>({});
	const [submitting, setSubmitting] = useState(false);
	const dialogRef = useRef<HTMLDialogElement>(null);
	const firstInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isOpen && initialData) {
			setFormData({
				title: initialData.title,
				description: initialData.description,
				category: initialData.category,
				priority: initialData.priority,
				status: initialData.status,
				dueDate: initialData.dueDate.split("T")[0],
			});
		} else if (isOpen) {
			setFormData({
				title: "",
				description: "",
				category: "Personal",
				priority: "Medium",
				status: "Todo",
				dueDate: "",
			});
		}
		setErrors({});
		setSubmitting(false);
	}, [isOpen, initialData]);

	useEffect(() => {
		if (isOpen && dialogRef.current) {
			dialogRef.current.showModal();
			setTimeout(() => firstInputRef.current?.focus(), 100);
		} else if (dialogRef.current) {
			dialogRef.current.close();
		}
	}, [isOpen]);

	const validate = (): boolean => {
		const newErrors: FormErrors = {};

		if (!formData.title.trim()) {
			newErrors.title = "Title is required";
		} else if (formData.title.length < 3) {
			newErrors.title = "Title must be at least 3 characters";
		}

		if (!formData.dueDate) {
			newErrors.dueDate = "Due date is required";
		} else {
			const dueDate = new Date(formData.dueDate);
			if (dueDate < new Date()) {
				newErrors.dueDate = "Due date cannot be in the past";
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validate()) {
			return;
		}

		setSubmitting(true);
		try {
			await onSubmit(formData);
			onClose();
		} catch (error) {
			console.error("Failed to submit task:", error);
		} finally {
			setSubmitting(false);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		// Clear error when user types
		if (errors[name as keyof FormErrors]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") {
			onClose();
		}
	};

	if (!isOpen) return null;

	return (
		<dialog
			ref={dialogRef}
			className="task-form-dialog"
			onKeyDown={handleKeyDown}
			aria-modal="true"
			role="dialog"
			aria-labelledby="dialog-title"
		>
			<div className="dialog-content">
				<h2 id="dialog-title">{initialData ? "Edit Task" : "Add New Task"}</h2>

				<form onSubmit={handleSubmit} noValidate>
					<div className="form-group">
						<label htmlFor="title">Title *</label>
						<input
							ref={firstInputRef}
							type="text"
							id="title"
							name="title"
							value={formData.title}
							onChange={handleChange}
							className={errors.title ? "error" : ""}
							aria-invalid={!!errors.title}
							aria-describedby={errors.title ? "title-error" : undefined}
						/>
						{errors.title && (
							<span id="title-error" className="error-message">
								{errors.title}
							</span>
						)}
					</div>

					<div className="form-group">
						<label htmlFor="description">Description</label>
						<textarea
							id="description"
							name="description"
							value={formData.description}
							onChange={handleChange}
							rows={3}
						/>
					</div>

					<div className="form-row">
						<div className="form-group">
							<label htmlFor="category">Category</label>
							<select
								id="category"
								name="category"
								value={formData.category}
								onChange={handleChange}
							>
								<option value="School">School</option>
								<option value="Assignment">Assignment</option>
								<option value="Project">Project</option>
								<option value="Personal">Personal</option>
								<option value="Exam">Exam</option>
							</select>
						</div>

						<div className="form-group">
							<label htmlFor="priority">Priority</label>
							<select
								id="priority"
								name="priority"
								value={formData.priority}
								onChange={handleChange}
							>
								<option value="Low">Low</option>
								<option value="Medium">Medium</option>
								<option value="High">High</option>
							</select>
						</div>
					</div>

					<div className="form-row">
						<div className="form-group">
							<label htmlFor="status">Status</label>
							<select
								id="status"
								name="status"
								value={formData.status}
								onChange={handleChange}
							>
								<option value="Todo">Todo</option>
								<option value="In Progress">In Progress</option>
								<option value="Completed">Completed</option>
							</select>
						</div>

						<div className="form-group">
							<label htmlFor="dueDate">Due Date *</label>
							<input
								type="date"
								id="dueDate"
								name="dueDate"
								value={formData.dueDate}
								onChange={handleChange}
								className={errors.dueDate ? "error" : ""}
								aria-invalid={!!errors.dueDate}
								aria-describedby={errors.dueDate ? "dueDate-error" : undefined}
							/>
							{errors.dueDate && (
								<span id="dueDate-error" className="error-message">
									{errors.dueDate}
								</span>
							)}
						</div>
					</div>

					<div className="dialog-actions">
						<button type="button" onClick={onClose} className="btn-cancel">
							Cancel
						</button>
						<button type="submit" className="btn-submit" disabled={submitting}>
							{submitting ? "Saving..." : initialData ? "Update" : "Create"}
						</button>
					</div>
				</form>
			</div>
		</dialog>
	);
};
