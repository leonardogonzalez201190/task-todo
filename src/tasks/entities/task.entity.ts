export class Task {
  taskId: string;

  createdBy: string;
  assignedTo: string;

  title: string;
  description?: string;

  status: 'PENDING' | 'IN_PROGRESS' | 'DONE';

  dueDate?: number;

  createdAt: number;
  updatedAt?: number;
}