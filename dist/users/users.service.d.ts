import { User } from './entities/user.entity';
export declare class UsersService {
    private readonly client;
    private readonly tableName;
    findAll(): Promise<User[]>;
}
