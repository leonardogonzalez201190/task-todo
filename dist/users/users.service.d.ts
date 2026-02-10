import { DynamodbService } from '../dynamodb/dynamodb.service';
import { User } from './entities/user.entity';
export declare class UsersService {
    private readonly dynamodbService;
    private readonly tableName;
    constructor(dynamodbService: DynamodbService);
    findAll(): Promise<User[]>;
}
