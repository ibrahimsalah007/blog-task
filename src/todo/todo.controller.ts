import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { CurrentUser } from 'App/users/decorator';
import { JwtAuthGuard } from 'App/auth/guard';
import { User } from 'App/users/schema/user.schema';

@ApiBearerAuth()
@ApiTags('Todos')
@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  createTodo(@Body() createTodoDto: CreateTodoDto, @CurrentUser() user: User) {
    return this.todoService.createTodo(user.id, createTodoDto);
  }

  @Get()
  findAll(@CurrentUser('id') userId: string) {
    return this.todoService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.todoService.findOneTodo(id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto, @CurrentUser('id') userId: string) {
    return this.todoService.updateTodo(userId, id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.todoService.removeTodo(userId, id);
  }
}
