import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DynamodbModule } from '../dynamodb/dynamodb.module';

@Module({
  imports: [DynamodbModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
