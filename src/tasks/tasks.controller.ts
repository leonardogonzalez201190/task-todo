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
    summary: 'Listar tareas creadas o asignadas a un usuario',
  })
  @ApiQuery({
    name: 'userId',
    required: true,
    description: 'ID del usuario',
  })
  searchByUser(@Query('userId') userId: string) {
    return this.tasksService.findByUser(userId);
  }

  // GET /tasks
  @Get()
  @ApiOperation({ summary: 'Listar todas las tareas' })
  findAll() {
    return this.tasksService.findAll();
  }

  // POST /tasks
  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  // PUT /tasks/:id
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una tarea parcialmente' })
  @ApiParam({ name: 'id', description: 'ID de la tarea' })
  update(
    @Param('id') taskId: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.tasksService.update(taskId, dto);
  }

  // DELETE /tasks/:id
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarea' })
  @ApiParam({ name: 'id', description: 'ID de la tarea' })
  remove(@Param('id') taskId: string) {
    return this.tasksService.remove(taskId);
  }
}
