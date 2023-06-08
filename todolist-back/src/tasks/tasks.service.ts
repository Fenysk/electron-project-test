import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks: string[] = [];

  getAllTasks(): string[] {
    return this.tasks;
  }

  getTaskById(id: number): string {
    if (id >= 0 && id < this.tasks.length) {
      return this.tasks[id];
    }
    return null;
  }

  createTask(task: string): string[] {
    this.tasks.push(task);
    return this.tasks;
  }

  updateTask(id: number, task: string): string[] {
    if (id >= 0 && id < this.tasks.length) {
      this.tasks[id] = task;
    }
    return this.tasks;
  }

  deleteTask(id: number): string[] {
    if (id >= 0 && id < this.tasks.length) {
      this.tasks.splice(id, 1);
    }
    return this.tasks;
  }
}
