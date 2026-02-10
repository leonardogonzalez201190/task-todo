import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly client = new DynamoDBClient({
    region: process.env.AWS_REGION || 'us-east-1',
  });

  private readonly tableName = 'Users';

  async findAll(): Promise<User[]> {
    const result = await this.client.send(
      new ScanCommand({
        TableName: this.tableName,
      }),
    );

    return (result.Items || []) as User[];
  }
}
