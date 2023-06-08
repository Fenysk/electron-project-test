import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTask(@Param('id') id: number) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() task: string) {
    return this.tasksService.createTask(task);
  }

  @Put(':id')
  updateTask(@Param('id') id: number, @Body() task: string) {
    return this.tasksService.updateTask(id, task);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }
}
