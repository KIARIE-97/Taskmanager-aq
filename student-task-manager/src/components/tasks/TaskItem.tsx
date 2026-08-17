import React from 'react'
import type { Task } from '../../types/task'
import { format } from 'date-fns'
import './TaskItem.css'

interface TaskItemProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onStatusChange: (id: string, Task['status']) => void
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onEdit,
  onDelete,
  onStatusChange
}) => {
  const statusOptions = ['Todo', 'In Progress', 'Completed'] as const

  const priorityClass = {
    Low: 'priority-low',
    Medium: 'priority-medium',
    High: 'priority-high'
  }[task.priority]

  const statusClass = {
    Todo: 'status-todo',
    'In Progress': 'status-in-progress',
    Completed: 'status-completed'
  }[task.status]

  return (
    <div className="task-item">
      <div className="task-col-title">
        <div className="task-title">{task.title}</div>
        <div className="task-description">{task.description}</div>
      </div>
      <div className="task-col-category">
        <span className="task-category">{task.category}</span>
      </div>
      <div className="task-col-priority">
        <span className={`task-priority ${priorityClass}`}>{task.priority}</span>
      </div>
      <div className="task-col-status">
        <select
          className={`task-status-select ${statusClass}`}
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
          aria-label={`Change status for ${task.title}`}
        >
          {statusOptions.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      <div className="task-col-due">
        {format(new Date(task.dueDate), 'MMM d, yyyy')}
      </div>
      <div className="task-col-actions">
        <button
          className="task-action-btn task-edit-btn"
          onClick={() => onEdit(task)}
          aria-label={`Edit ${task.title}`}
        >
          Edit
        </button>
        <button
          className="task-action-btn task-delete-btn"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
        >
          Delete
        </button>
      </div>
    </div>
  )
}