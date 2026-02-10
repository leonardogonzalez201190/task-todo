import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    searchByUser(userId: string): Promise<Record<string, any>[]>;
    findAll(): Promise<Record<string, any>[]>;
    create(dto: CreateTaskDto): Promise<{
        taskId: `${string}-${string}-${string}-${string}-${string}`;
        title: string;
        description: string;
        dueDate: number;
        createdBy: string;
        assignedTo: string;
        status: string;
        createdAt: number;
    }>;
    update(taskId: string, dto: UpdateTaskDto): Promise<Record<string, any>>;
    remove(taskId: string): Promise<{
        message: string;
    }>;
}
