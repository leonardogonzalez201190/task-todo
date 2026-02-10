import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../tasks.service';
import { DynamodbService } from '../../dynamodb/dynamodb.service';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskStatus } from '../dto/create-task.dto';

const sendMock = jest.fn();

describe('TasksService', () => {
    let service: TasksService;

    beforeEach(async () => {
        sendMock.mockReset();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TasksService,
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

        service = module.get<TasksService>(TasksService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    
    it('should return all tasks', async () => {
        sendMock.mockResolvedValue({
            Items: [
                { taskId: '1', title: 'Task 1' },
                { taskId: '2', title: 'Task 2' },
            ],
        });

        const result = await service.findAll();

        expect(result).toHaveLength(2);
        expect(result[0].title).toBe('Task 1');
        expect(sendMock).toHaveBeenCalled();
    });

    it('should update a task partially', async () => {
        sendMock.mockResolvedValue({
            Attributes: {
                taskId: 'task-1',
                title: 'Updated title',
                status: TaskStatus.DONE,
            },
        });

        const dto: UpdateTaskDto = {
            title: 'Updated title',
            status: TaskStatus.DONE,
        };

        const result = await service.update('task-1', dto);

        expect(sendMock).toHaveBeenCalled();
        expect(result.taskId).toBe('task-1');
        expect(result.title).toBe('Updated title');
        expect(result.status).toBe(TaskStatus.DONE);
    });

    it('should delete a task', async () => {
        sendMock.mockResolvedValue({});

        const result = await service.remove('task-1');

        expect(sendMock).toHaveBeenCalled();
        expect(result).toEqual({ message: 'Task deleted successfully' });
    });
});
