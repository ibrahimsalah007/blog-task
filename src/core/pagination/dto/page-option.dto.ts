import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsEnum, IsOptional, IsInt, Min, Max } from 'class-validator';

import { Order } from 'App/core/enum';
import { Transform, Type } from 'class-transformer';

export class PageOptionDto {
  @ApiPropertyOptional({ enum: Order, default: Order.DESC })
  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(Order)
  @IsOptional()
  readonly orderBy?: Order = Order.DESC;

  @ApiPropertyOptional()
  @IsOptional()
  readonly sortBy?: string = 'id';

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  get order() {
    return { [this.sortBy]: this.orderBy };
  }
}
