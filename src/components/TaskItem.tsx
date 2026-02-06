import type { Task } from '../types/task';
import styles from './TaskItem.module.css';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

function isOverdue(dueDate?: string): boolean {
  if (!dueDate) return false;
  const today = new Date().toISOString().split('T')[0];
  return dueDate < today;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function TaskItem({ task, onToggle, onEdit, onDelete }: TaskItemProps) {
  const overdue = !task.completed && isOverdue(task.dueDate);

  return (
    <div className={`${styles.item} ${task.completed ? styles.completed : ''}`}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
      />
      <div
        className={styles.content}
        role="button"
        tabIndex={0}
        onClick={() => onEdit(task)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onEdit(task); } }}
        aria-label={`Edit "${task.title}"`}
      >
        <span className={styles.title}>{task.title}</span>
        {task.description && (
          <span className={styles.description}>{task.description}</span>
        )}
      </div>
      <span className={`${styles.priority} ${styles[task.priority]}`}>
        {task.priority}
      </span>
      {task.dueDate && (
        <span className={`${styles.dueDate} ${overdue ? styles.overdue : ''}`}>
          {formatDate(task.dueDate)}
        </span>
      )}
      <button
        className={styles.deleteButton}
        onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
        aria-label={`Delete "${task.title}"`}
      >
        &times;
      </button>
    </div>
  );
}
