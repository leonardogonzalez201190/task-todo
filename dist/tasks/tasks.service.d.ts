import { DynamodbService } from '../dynamodb/dynamodb.service';
import { CreateTaskDto } from './dto/create-task.dto';
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
        creator: string;
        assignee: string;
        status: string;
        createdAt: number;
    }>;
}
