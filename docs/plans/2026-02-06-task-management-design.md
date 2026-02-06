# Task Management Application — Design Document

## Overview

A single-page React + TypeScript web app for managing tasks with priority levels, due dates, and filtering. No backend — all data persisted to browser localStorage. Bootstrapped with Vite.

## Data Model

```typescript
interface Task {
  id: string;           // crypto.randomUUID()
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;     // ISO date string (YYYY-MM-DD)
  completed: boolean;
  createdAt: string;    // ISO timestamp
  updatedAt: string;    // ISO timestamp
}
```

## Component Tree

```
App
├── Header (app title + "Add Task" button)
├── FilterBar
│   ├── TextSearch (input field)
│   ├── PriorityFilter (dropdown/chips: All, Low, Medium, High)
│   ├── StatusFilter (dropdown/chips: All, Active, Completed)
│   └── DueDateFilter (date range picker: from/to)
├── TaskList
│   └── TaskItem (one per task — title, priority badge, due date, checkbox)
└── TaskModal (add/edit form — title, description, priority select, date picker)
```

## State Management

A single `useTasks` custom hook owns the task array, exposes CRUD operations, and syncs to localStorage on every change.

```typescript
function useTasks() {
  tasks: Task[];
  addTask(input: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completed'>): void;
  updateTask(id: string, updates: Partial<Task>): void;
  deleteTask(id: string): void;
  toggleComplete(id: string): void;
}
```

Internally uses `useState` initialized from localStorage via lazy initializer. A `useEffect` syncs back to localStorage on changes.

Filter state lives in `App` and is passed to `TaskList`, which filters in-place before rendering.

## UI Behavior

### TaskItem Display
- Checkbox (left), task title, priority badge (color-coded: red=high, yellow=medium, green=low), due date (right)
- Overdue tasks show date in red
- Completed tasks get strikethrough title and reduced opacity

### Add/Edit Flow
- "Add Task" button or clicking existing task opens modal
- Form: title (required), description (optional textarea), priority (dropdown, defaults to Medium), due date (optional date input)
- Save validates non-empty title, creates/updates task, closes modal

### Delete Flow
- Trash icon appears on hover per TaskItem
- Immediate deletion, no confirmation dialog

### Filtering
- All filters apply simultaneously (AND logic)
- Text search: case-insensitive substring match on title and description
- Priority and status: single-select dropdowns defaulting to "All"
- Due date: optional "from" and "to" date inputs (independent)
- Active filter count shown as badge
- "Clear filters" button resets all

### Sorting
Incomplete before completed, then by priority (high > medium > low), then by due date (earliest first, no-date last).

## Styling

CSS Modules scoped per component. Neutral color palette (grays/white) with color for priority badges and interactive elements. Responsive flexbox layout.

## File Structure

```
src/
  components/    — Header, FilterBar, TaskList, TaskItem, TaskModal
  hooks/         — useTasks.ts
  utils/         — filterTasks.ts
  types/         — task.ts (Task interface, FilterState type)
  App.tsx
  App.module.css
  main.tsx
```
