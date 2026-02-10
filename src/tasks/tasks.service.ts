import { Injectable } from '@nestjs/common';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DynamodbService } from '../dynamodb/dynamodb.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { randomUUID } from 'crypto';
import { PutCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private readonly tableName = 'Tasks';

  constructor(private readonly dynamodbService: DynamodbService) { }

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
      createdBy: dto.createdBy,
      assignedTo: dto.assignedTo,
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

  async remove(taskId: string) {
    const client = this.dynamodbService.getClient();

    const command = new DeleteCommand({
      TableName: this.tableName,
      Key: { taskId },
    });

    await client.send(command);

    return { message: 'Task deleted successfully' };
  }


  async update(taskId: string, dto: UpdateTaskDto) {
    const client = this.dynamodbService.getClient();

    const updateExpressions: string[] = [];
    const expressionAttributeValues: Record<string, any> = {};
    const expressionAttributeNames: Record<string, string> = {};

    for (const [key, value] of Object.entries(dto)) {
      if (value === undefined) continue;

      updateExpressions.push(`#${key} = :${key}`);
      expressionAttributeValues[`:${key}`] = value;
      expressionAttributeNames[`#${key}`] = key;
    }

    if (updateExpressions.length === 0) {
      throw new Error('No fields provided to update');
    }

    const command = new UpdateCommand({
      TableName: this.tableName,
      Key: { taskId },
      UpdateExpression: `SET ${updateExpressions.join(', ')}`,
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: expressionAttributeNames,
      ReturnValues: 'ALL_NEW',
    });

    const result = await client.send(command);

    return result.Attributes;
  }

  async findByUser(userId: string) {
    const client = this.dynamodbService.getClient();

    const command = new ScanCommand({
      TableName: this.tableName,
      FilterExpression:
        'createdBy = :userId OR assignedTo = :userId',
      ExpressionAttributeValues: {
        ':userId': userId,
      },
    });

    const result = await client.send(command);

    return result.Items ?? [];
  }
}
