import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export enum TaskStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class CreateTaskDto {
  @ApiProperty({ example: 'Implementar API Tasks' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'user_1' })
  @IsString()
  @IsNotEmpty()
  createdBy: string;

  @ApiProperty({ example: 'Usar NestJS + DynamoDB', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1712500000, description: 'Unix timestamp', required: false })
  @IsNumber()
  @IsOptional()
  dueDate?: number;

  @ApiProperty({
    example: 'user_2',
    description: 'Usuario asignado (si no se envía, se asigna al creador)',
    required: false,
  })
  @IsString()
  @IsOptional()
  assignedTo?: string;

  @ApiProperty({
    example: TaskStatus.PENDING,
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
