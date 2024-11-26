import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum taskType {
  DEVELOPMENT = 'Development',
  TEST = 'Test',
  DOCUMENT = 'Document',
}

export enum taskStatus {
  IN_PROGRESS = 'ดำเนินการ',
  COMPLETED = 'เสร็จสิ้น',
  CANCELLED = 'ยกเลิก',
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: taskType,
    default: taskType.DEVELOPMENT,
  })
  taskType: taskType;

  @Column()
  taskName: string;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTime: Date;

  @Column({
    type: 'enum',
    enum: taskStatus,
    default: taskStatus.IN_PROGRESS,
  })
  status: taskStatus;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}