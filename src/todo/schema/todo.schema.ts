import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import * as Mongoose from 'mongoose';

import { User } from 'App/users/schema/user.schema';

export type TodoDocument = Todo & Mongoose.Document;

@Schema({ timestamps: true })
export class Todo {
  @ApiProperty()
  @Prop()
  title: string;

  @ApiPropertyOptional()
  @Prop()
  description: string;

  @ApiProperty()
  @Prop({
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;

  @ApiProperty()
  @Prop({ default: false })
  completed: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
