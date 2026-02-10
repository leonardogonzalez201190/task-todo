import { Injectable } from '@nestjs/common';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DynamodbService } from '../dynamodb/dynamodb.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { randomUUID } from 'crypto';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class TasksService {
  private readonly tableName = 'Tasks';

  constructor(private readonly dynamodbService: DynamodbService) {}

  async findAll() {
    const client = this.dynamodbService.getClient();

    const command = new ScanCommand({
      TableName: this.tableName,
    });

    const result = await client.send(command);

    return result.Items ?? [];
  }

  async create(dto: CreateTaskDto) {
    const client = this.dynamodbService.getClient();

    const task = {
      taskId: randomUUID(),
      title: dto.title,
      description: dto.description,
      dueDate: dto.dueDate,
      creator: dto.creator,
      assignee: dto.assignee,
      status: dto.status ?? 'pending',
      createdAt: Math.floor(Date.now() / 1000),
    };

    const command = new PutCommand({
      TableName: this.tableName,
      Item: task,
    });

    await client.send(command);

    return task;
  }
}
