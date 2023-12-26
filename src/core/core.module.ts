import { Global, Module } from '@nestjs/common';

import { PaginationService } from './pagination';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [PaginationService],
  exports: [PaginationService],
})
export class CoreModule {}
