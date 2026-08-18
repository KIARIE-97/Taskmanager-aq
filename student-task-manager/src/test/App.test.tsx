import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Tasks } from "../pages/Task";
// import { taskService } from "../services/taskService";

describe("Dashboard", () => {
	it("renders summary cards", async () => {
		render(
			<BrowserRouter>
				<Dashboard />
			</BrowserRouter>,
		);

		await waitFor(() => {
			expect(screen.getByText("Total Tasks")).toBeInTheDocument();
			expect(screen.getByText("Pending")).toBeInTheDocument();
			expect(screen.getByText("In Progress")).toBeInTheDocument();
			expect(screen.getByText("Completed")).toBeInTheDocument();
			expect(screen.getByText("High Priority")).toBeInTheDocument();
		});
	});
});

describe("Tasks", () => {
	it("renders task list", async () => {
		render(
			<BrowserRouter>
				<Tasks />
			</BrowserRouter>,
		);

		await waitFor(() => {
			expect(screen.getByText("Tasks")).toBeInTheDocument();
			expect(
				screen.getByPlaceholderText("Search tasks by title or description..."),
			).toBeInTheDocument();
		});
	});

	it("filters tasks by status", async () => {
		const user = userEvent.setup();
		render(
			<BrowserRouter>
				<Tasks />
			</BrowserRouter>,
		);

		await waitFor(() => {
			const statusFilter = screen.getByLabelText("Filter by status");
			fireEvent.change(statusFilter, { target: { value: "Todo" } });
			// Assert filtered results
		});
	});

	it("creates a new task", async () => {
		const user = userEvent.setup();
		render(
			<BrowserRouter>
				<Tasks />
			</BrowserRouter>,
		);

		await waitFor(() => {
			const addButton = screen.getByText("Add Task");
			fireEvent.click(addButton);

			// Fill form
			const titleInput = screen.getByLabelText("Title *");
			fireEvent.change(titleInput, { target: { value: "Test Task" } });

			const dueDateInput = screen.getByLabelText("Due Date *");
			fireEvent.change(dueDateInput, { target: { value: "2025-12-31" } });

			const submitButton = screen.getByText("Create");
			fireEvent.click(submitButton);
		});

		await waitFor(() => {
			expect(screen.getByText("Test Task")).toBeInTheDocument();
		});
	});
});
