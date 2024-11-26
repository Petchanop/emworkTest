import { IsString, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { taskType, taskStatus } from '../entities/task.entity'; // Assuming Task entity is in the same directory
import { ApiProperty } from '@nestjs/swagger';

export class TaskDTO {
  
  @ApiProperty({
    description: 'The type of the task',
    enum: taskType,
    default: taskType.DEVELOPMENT,
  })
  @IsEnum(taskType)
  taskType: taskType;

  @ApiProperty({
    description: 'The name of the task',
  })
  @IsString()
  taskName: string;

  @ApiProperty({
    description: 'The start time of the task',
    example: '2024-11-26T10:30:00Z',
  })
  @IsDateString()
  startTime: string; // Use string to accept date-time as ISO 8601 string

  @ApiProperty({
    description: 'The end time of the task (optional)',
    example: '2024-11-26T12:30:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  endTime?: string;

  @ApiProperty({
    description: 'The status of the task',
    enum: taskStatus,
    default: taskStatus.IN_PROGRESS,
  })
  @IsEnum(taskStatus)
  status: taskStatus;
}