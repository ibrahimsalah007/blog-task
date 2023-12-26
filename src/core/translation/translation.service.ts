import { Injectable } from '@nestjs/common';
import { TranslateOptions, I18nContext } from 'nestjs-i18n';

@Injectable()
export class TranslationService {
  static translate(key: any, options: TranslateOptions = { lang: I18nContext.current().lang, args: {} }) {
    options.lang = I18nContext.current().lang;
    return I18nContext.current().service.translate(key, options);
  }
}
