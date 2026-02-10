import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(dto: CreateTaskDto): Promise<{
        taskId: `${string}-${string}-${string}-${string}-${string}`;
        title: string;
        description: string;
        dueDate: number;
        creator: string;
        assignee: string;
        status: string;
        createdAt: number;
    }>;
    findAll(): Promise<Record<string, any>[]>;
}
