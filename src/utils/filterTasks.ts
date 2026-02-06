import type { Task, FilterState } from '../types/task';

const priorityOrder: Record<Task['priority'], number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export function filterTasks(tasks: Task[], filters: FilterState): Task[] {
  const filtered = tasks.filter((task) => {
    if (filters.search) {
      const query = filters.search.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(query);
      const matchesDesc = task.description?.toLowerCase().includes(query) ?? false;
      if (!matchesTitle && !matchesDesc) return false;
    }

    if (filters.priority !== 'all' && task.priority !== filters.priority) {
      return false;
    }

    if (filters.status === 'active' && task.completed) return false;
    if (filters.status === 'completed' && !task.completed) return false;

    if (filters.dueDateFrom && task.dueDate) {
      if (task.dueDate < filters.dueDateFrom) return false;
    }
    if (filters.dueDateFrom && !task.dueDate) return false;

    if (filters.dueDateTo && task.dueDate) {
      if (task.dueDate > filters.dueDateTo) return false;
    }
    if (filters.dueDateTo && !task.dueDate) return false;

    return true;
  });

  return filtered.toSorted((a, b) => {
    // Incomplete before completed
    if (a.completed !== b.completed) return a.completed ? 1 : -1;

    // Higher priority first
    if (a.priority !== b.priority) return priorityOrder[a.priority] - priorityOrder[b.priority];

    // Earlier due date first, no-date last
    if (a.dueDate && b.dueDate) return a.dueDate.localeCompare(b.dueDate);
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;

    return 0;
  });
}

export function activeFilterCount(filters: FilterState): number {
  let count = 0;
  if (filters.search) count++;
  if (filters.priority !== 'all') count++;
  if (filters.status !== 'all') count++;
  if (filters.dueDateFrom) count++;
  if (filters.dueDateTo) count++;
  return count;
}
