import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { DynamodbService } from '../../dynamodb/dynamodb.service';

const sendMock = jest.fn();

describe('UsersService', () => {
    let service: UsersService;

    beforeEach(async () => {
        sendMock.mockReset();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: DynamodbService,
                    useValue: {
                        getClient: jest.fn().mockReturnValue({
                            send: sendMock,
                        }),
                    },
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return all users', async () => {
        sendMock.mockResolvedValue({
            Items: [
                {
                    userId: 'user_1',
                    email: 'user1@test.com',
                    name: 'User One',
                },
                {
                    userId: 'user_2',
                    email: 'user2@test.com',
                    name: 'User Two',
                },
            ],
        });

        const result = await service.findAll();

        expect(result).toHaveLength(2);
        expect(result[0].userId).toBe('user_1');
        expect(sendMock).toHaveBeenCalled();
    });
});
