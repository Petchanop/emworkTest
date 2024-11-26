import { DataSource } from "typeorm";
import { Task, taskStatus, taskType } from "./task/entities/task.entity";

function generateMockTasks(days: number): Array<any> {
  const tasks: Array<any> = [];
  const taskNames = [
    'Develop new feature',
    'Test new feature',
    'Write documentation',
    'Fix bug in code',
    'Test bug fix',
    'Create project report',
    'Implement new feature',
    'Update documentation',
    'Code review',
  ];

  const taskStatuses = [taskStatus.IN_PROGRESS, taskStatus.COMPLETED, taskStatus.CANCELLED];

  for (let i = 0; i < days; i++) {
    const currentDay = new Date();
    currentDay.setDate(currentDay.getDate() + i); // Adjust the current date for each day

    for (let j = 0; j < 5; j++) {
      const taskTypeRandom = Object.values(taskType)[Math.floor(Math.random() * Object.values(taskType).length)];
      const taskNameRandom = taskNames[Math.floor(Math.random() * taskNames.length)];
      const taskStatusRandom = taskStatuses[Math.floor(Math.random() * taskStatuses.length)];

      const startTime = new Date(currentDay.setHours(9 + j, 0, 0)); // Random time each day
      const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); // Adding 2 hours to the start time

      tasks.push({
        taskType: taskTypeRandom,
        taskName: taskNameRandom,
        startTime: startTime,
        endTime: endTime,
        status: taskStatusRandom,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }

  return tasks;
}

// Example usage: Generate tasks for 5 days
const mockTasks = generateMockTasks(5);
console.log(mockTasks);

export default () => ({
  port: 3333,
  database: {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT, 10) || 5432
  }
});

//db configuration
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'emwork',
  password: 'emworktest',
  database: 'emworktestdb',
  entities: [Task],
  synchronize: true,
  logging: true,
})

AppDataSource.initialize()
  .then(async () => {
    const result = await AppDataSource.createQueryBuilder()
        .insert()
        .into(Task)
        .values(mockTasks).execute()
      console.log("insert mock tasks", result);
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })