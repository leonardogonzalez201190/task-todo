import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { TaskStatus } from './create-task.dto';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Actualizar documentación' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    example: 1712500000,
    description: 'Unix timestamp',
  })
  @IsNumber()
  @IsOptional()
  dueDate?: number;

  @ApiPropertyOptional({
    example: TaskStatus.IN_PROGRESS,
    enum: TaskStatus,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
