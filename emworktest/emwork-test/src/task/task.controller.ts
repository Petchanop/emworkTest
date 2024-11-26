import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { TaskDTO } from './dto/task.dto';

@ApiTags('Tasks') // Tag for grouping related routes in Swagger UI
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // Create a new task
  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: TaskDTO }) // Define the request body type
  @ApiResponse({ status: 201, description: 'The task has been successfully created.', type: Task })
  @ApiResponse({ status: 400, description: 'Invalid task data provided.' })
  async createTask(@Body() taskData: Partial<TaskDTO>): Promise<Task> {
    try {
      const task = await this.taskService.createtask(taskData);
      return task;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Update a task by ID
  @Patch(':id')
  @ApiBody({ type: TaskDTO })
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiResponse({ status: 200, description: 'The task has been successfully updated.', type: Task })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async updateTask(
    @Param('id') id: number,
    @Body() updatedData: Partial<TaskDTO>,
  ): Promise<Task | null> {
    const task = await this.taskService.updatetask(id, updatedData);
    return task; 
  }

  // Delete a task by ID
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by ID' })
  @ApiResponse({ status: 200, description: 'The task has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  async deleteTask(@Param('id') id: number): Promise<{ message: string }> {
    const result = await this.taskService.deletetask(id);
    if (!result) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Task deleted successfully' };
  }

  // Get all tasks with optional filtering by date
  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiQuery({ name: 'date', required: false, type: String, description: 'Filter tasks by date' })
  @ApiResponse({ status: 200, description: 'List of tasks', type: [Task] })
  async getTasks(@Query('date') date?: string): Promise<Task[]> {
    const convertDate = date ? new Date(date) : null
    const result = this.taskService.gettasks(convertDate);
    return result;
  }

  // Get daily report based on a specific date
  @Get('reports/daily')
  @ApiOperation({ summary: 'Get a daily report based on a today date' })
  @ApiResponse({ status: 200, description: 'List of tasks for the specified date', type: [Task] })
  async getDailyReport(): Promise<Task[]> {
    const date = new Date();
    const result = await this.taskService.getDailyReport(new Date(date.toDateString()));
    return result;
  }

  // Get monthly status summary report
  @Get('reports/monthly-status')
  @ApiOperation({ summary: 'Get a monthly summary of task statuses' })
  @ApiQuery({ name: 'year', required: true, type: String, description: 'The year for the report' })
  @ApiQuery({ name: 'month', required: true, type: String, description: 'The month for the report' })
  @ApiResponse({ status: 200, description: 'Summary of task statuses for the specified month', type: Object })
  async getMonthlyStatusReport(
    @Query('year') year: string,
    @Query('month') month: string,
  ): Promise<Record<string, number>> {
    if (!year || !month) {
      throw new HttpException('Year and month are required', HttpStatus.BAD_REQUEST);
    }
    const result = await this.taskService.getMonthlyStatusReport(parseInt(year), parseInt(month));
    return result;
  }
}
