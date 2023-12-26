import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateTodoDto, UpdateTodoDto } from './dto';
import { Todo, TodoDocument } from './schema/todo.schema';
import { Model } from 'mongoose';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name)
    private readonly todoModel: Model<TodoDocument>,
  ) {}

  async createTodo(userId: string, createTodoDto: CreateTodoDto) {
    return this.todoModel.create({ ...createTodoDto, user: userId });
  }

  findAll(user?: string) {
    return this.todoModel.find({ user }).populate('user');
  }

  async findOneTodo(todoId: string, user: string): Promise<Todo> {
    const todo = await this.todoModel.findOne({ _id: todoId, user }).populate('user');

    if (!todo) throw new NotFoundException(`Todo with id: ${todoId} not found`);

    return todo;
  }

  async updateTodo(user: string, todoId: string, updateTodoDto: UpdateTodoDto): Promise<void> {
    await this.findOneTodo(todoId, user);

    await this.todoModel.findByIdAndUpdate(todoId, updateTodoDto);
  }

  async removeTodo(user: string, todoId: string): Promise<void> {
    await this.findOneTodo(todoId, user);

    await this.todoModel.findByIdAndDelete(todoId);
  }
}
