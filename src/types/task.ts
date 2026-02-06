export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FilterState {
  search: string;
  priority: 'all' | 'low' | 'medium' | 'high';
  status: 'all' | 'active' | 'completed';
  dueDateFrom: string;
  dueDateTo: string;
}

export const defaultFilters: FilterState = {
  search: '',
  priority: 'all',
  status: 'all',
  dueDateFrom: '',
  dueDateTo: '',
};
