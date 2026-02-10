import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DynamodbModule } from '../dynamodb/dynamodb.module';

@Module({
  imports: [DynamodbModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
