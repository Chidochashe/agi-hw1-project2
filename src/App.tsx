import { useState } from 'react';
import type { Task, FilterState } from './types/task';
import { defaultFilters } from './types/task';
import { useTasks } from './hooks/useTasks';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { TaskList } from './components/TaskList';
import { TaskModal } from './components/TaskModal';
import styles from './App.module.css';

export default function App() {
  const { tasks, addTask, updateTask, deleteTask, toggleComplete } = useTasks();
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  function handleAddClick() {
    setEditingTask(null);
    setModalOpen(true);
  }

  function handleEdit(task: Task) {
    setEditingTask(task);
    setModalOpen(true);
  }

  function handleSave(data: { title: string; description?: string; priority: Task['priority']; dueDate?: string }) {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      addTask(data);
    }
    setModalOpen(false);
    setEditingTask(null);
  }

  function handleClose() {
    setModalOpen(false);
    setEditingTask(null);
  }

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header onAddTask={handleAddClick} />
        <FilterBar filters={filters} onChange={setFilters} />
        <TaskList
          tasks={tasks}
          filters={filters}
          onToggle={toggleComplete}
          onEdit={handleEdit}
          onDelete={deleteTask}
        />
      </div>
      {modalOpen && (
        <TaskModal task={editingTask} onSave={handleSave} onClose={handleClose} />
      )}
    </div>
  );
}
