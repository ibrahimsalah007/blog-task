import { Injectable } from '@nestjs/common';

import { PageDto, PageMetaDto, PageOptionDto } from './dto';

@Injectable()
export class PaginationService {
  static paginate<T>(rows: T[], count: number, pageOptionDto: PageOptionDto) {
    const pageMetaDto = new PageMetaDto({
      itemCount: count,
      pageOptionsDto: pageOptionDto,
    });

    return new PageDto(rows, pageMetaDto);
  }
}
