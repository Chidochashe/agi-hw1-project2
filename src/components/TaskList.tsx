import { useMemo } from 'react';
import type { Task, FilterState } from '../types/task';
import { filterTasks } from '../utils/filterTasks';
import { TaskItem } from './TaskItem';
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: Task[];
  filters: FilterState;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, filters, onToggle, onEdit, onDelete }: TaskListProps) {
  const filtered = useMemo(() => filterTasks(tasks, filters), [tasks, filters]);

  if (tasks.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>&#9744;</div>
        <p>Nothing here yet. Add your first task to get started.</p>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>&#8981;</div>
        <p>No tasks match the current filters.</p>
      </div>
    );
  }

  return (
    <div className={styles.list} role="list" aria-label="Task list">
      {filtered.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
