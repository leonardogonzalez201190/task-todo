import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Implementar API Tasks' })
  title: string;

  @ApiProperty({ example: 'Usar NestJS + DynamoDB' })
  description: string;

  @ApiProperty({ example: 1712500000, description: 'Unix timestamp' })
  dueDate?: number;

  @ApiProperty({ example: 'user_1', description: 'Usuario creador' })
  creator: string;

  @ApiProperty({ example: 'user_2', description: 'Usuario asignado' })
  assignee: string;

  @ApiProperty({ example: 'pending', enum: ['pending', 'in_progress', 'done'] })
  status: string;
}
