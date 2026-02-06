import styles from './Header.module.css';

interface HeaderProps {
  onAddTask: () => void;
}

export function Header({ onAddTask }: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Tasks</h1>
      <button className={styles.addButton} onClick={onAddTask}>
        + Add Task
      </button>
    </header>
  );
}
