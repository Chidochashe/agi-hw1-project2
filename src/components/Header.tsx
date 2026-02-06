import styles from './Header.module.css';

interface HeaderProps {
  onAddTask: () => void;
  taskCount: number;
}

export function Header({ onAddTask, taskCount }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.titleGroup}>
        <h1 className={styles.title}>Tasks</h1>
        <span className={styles.subtitle}>
          {taskCount === 0 ? 'No tasks yet' : `${taskCount} task${taskCount !== 1 ? 's' : ''}`}
        </span>
      </div>
      <button className={styles.addButton} onClick={onAddTask}>
        <span className={styles.addIcon}>+</span>
        New Task
      </button>
    </header>
  );
}
