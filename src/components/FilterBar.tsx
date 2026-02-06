import type { FilterState } from '../types/task';
import { activeFilterCount } from '../utils/filterTasks';
import { defaultFilters } from '../types/task';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export function FilterBar({ filters, onChange }: FilterBarProps) {
  const count = activeFilterCount(filters);

  function update(partial: Partial<FilterState>) {
    onChange({ ...filters, ...partial });
  }

  return (
    <div className={styles.bar} role="search" aria-label="Filter tasks">
      <div className={styles.row}>
        <input
          type="text"
          className={styles.search}
          placeholder="Search tasks..."
          aria-label="Search tasks"
          value={filters.search}
          onChange={(e) => update({ search: e.target.value })}
        />
        <select
          className={styles.select}
          aria-label="Filter by priority"
          value={filters.priority}
          onChange={(e) => update({ priority: e.target.value as FilterState['priority'] })}
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          className={styles.select}
          aria-label="Filter by status"
          value={filters.status}
          onChange={(e) => update({ status: e.target.value as FilterState['status'] })}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className={styles.row}>
        <label className={styles.dateLabel}>
          From
          <input
            type="date"
            className={styles.dateInput}
            value={filters.dueDateFrom}
            max={filters.dueDateTo || undefined}
            onChange={(e) => update({ dueDateFrom: e.target.value })}
          />
        </label>
        <label className={styles.dateLabel}>
          To
          <input
            type="date"
            className={styles.dateInput}
            value={filters.dueDateTo}
            min={filters.dueDateFrom || undefined}
            onChange={(e) => update({ dueDateTo: e.target.value })}
          />
        </label>
        {count > 0 && (
          <button
            className={styles.clearButton}
            onClick={() => onChange(defaultFilters)}
          >
            Clear filters ({count})
          </button>
        )}
      </div>
    </div>
  );
}
