import { Injectable } from '@nestjs/common';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DynamodbService } from '../dynamodb/dynamodb.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly tableName = 'Users';

  constructor(
    private readonly dynamodbService: DynamodbService,
  ) { }

  async findAll(): Promise<User[]> {
    const client = this.dynamodbService.getClient();

    const result = await client.send(
      new ScanCommand({
        TableName: this.tableName,
      }),
    );

    return (result.Items ?? []) as User[];
  }
}
