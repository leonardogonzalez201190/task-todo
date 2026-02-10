import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }


  @Get('search')
  @ApiOperation({
    summary: 'List tasks created or assigned to a user',
  })
  @ApiQuery({
    name: 'userId',
    required: true,
    description: 'User ID',
  })
  searchByUser(@Query('userId') userId: string) {
    return this.tasksService.findByUser(userId);
  }

  // GET /tasks
  @Get()
  @ApiOperation({ summary: 'List all tasks' })
  findAll() {
    return this.tasksService.findAll();
  }

  // POST /tasks
  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  // PUT /tasks/:id
  @Put(':id')
  @ApiOperation({ summary: 'Update a task partially' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  update(
    @Param('id') taskId: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.tasksService.update(taskId, dto);
  }

  // DELETE /tasks/:id
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  remove(@Param('id') taskId: string) {
    return this.tasksService.remove(taskId);
  }
}
