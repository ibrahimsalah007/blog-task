import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  @IsDefined()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional({ default: false })
  @IsBoolean()
  @IsDefined()
  completed: boolean;
}
