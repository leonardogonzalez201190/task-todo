import { DynamodbService } from '../dynamodb/dynamodb.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private readonly dynamodbService;
    private readonly tableName;
    constructor(dynamodbService: DynamodbService);
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
    remove(taskId: string): Promise<{
        message: string;
    }>;
    update(taskId: string, dto: UpdateTaskDto): Promise<Record<string, any>>;
    findByUser(userId: string): Promise<Record<string, any>[]>;
}
