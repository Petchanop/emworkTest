import { Injectable } from '@nestjs/common';
import { Task, taskStatus } from './entities/task.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskDTO } from './dto/task.dto';

@Injectable()
export class TaskService {
  
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    private dataSource: DataSource,
  ) {}

  // Create a newtask 
  async createtask(taskData: Partial<TaskDTO>): Promise<Task> {
    const task = this.taskRepository.create(taskData);
    return await this.taskRepository.save(task);
  }

  // Update a task by ID
  async updatetask(id: number, updatedData: Partial<TaskDTO>): Promise<Task | null> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) return null;

    Object.assign(task, updatedData);
    return await this.taskRepository.save(task);
  }

  // Delete a task by ID
  async deletetask(id: number): Promise<boolean> {
    const result = await this.taskRepository.delete(id);
    return result.affected ? true : false;
  }

  // Get all tasks with optional filtering by date
  async gettasks(date?: Date): Promise<Task[]> {
    console.log('gettask', date);
    const queryBuilder = this.taskRepository.createQueryBuilder('task');
    if (date) {
      return await queryBuilder.where('DATE(task.startTime) = :date', { date }).getMany();
    }
    return await this.taskRepository.find();
  }

  // Get daily report based on a specific date
  async getDailyReport(date: Date): Promise<Task[]> {
    return await this.taskRepository.createQueryBuilder('task').where('DATE(task.startTime) = :date', { date }).getMany();
  }

  // Get monthly status summary report
  async getMonthlyStatusReport(year: number, month: number): Promise<Record<taskStatus, number>> {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);

    const result = await this.taskRepository
      .createQueryBuilder('task')
      .select('task.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('task.startTime BETWEEN :start AND :end', { start: startOfMonth, end: endOfMonth })
      .groupBy('task.status')
      .getRawMany();

    // Convert raw data to a summary object
    const summary: Record<taskStatus, number> = {
      [taskStatus.IN_PROGRESS]: 0,
      [taskStatus.COMPLETED]: 0,
      [taskStatus.CANCELLED]: 0,
    };

    result.forEach(row => {
      summary[row.status] = parseInt(row.count, 10);
    });

    return summary;
  }
}
