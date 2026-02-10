import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { DynamodbModule } from './dynamodb/dynamodb.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TasksModule, DynamodbModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
