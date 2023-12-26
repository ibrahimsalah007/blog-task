import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { I18nMiddleware, I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';
import { SupportedLanguages } from './core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * This logger is used to log the request and response of the API in the console
   */
  app.useLogger(app.get(Logger));

  /**
   * This middleware is used to enable the CORS for the application
   */
  app.enableCors();

  /**
   * This middleware is used to set the language
   */
  app.use(I18nMiddleware);

  /**
   * This pipe is used to validate the DTOs with i18n
   */

  app.useGlobalPipes(new I18nValidationPipe());

  /**
   * This pipe is used to validate the DTOs
   */
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  /**
   * This filter is used to catch the error thrown by the @UsePipes decorator
   */
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false,
      errorHttpStatusCode: 422,
    }),
  );

  const configService = app.get(ConfigService);

  /**
   * This is the swagger configuration for the API documentation generation and display on the browser at /docs route
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Todo Task API')
    .setDescription('Todo Task API Documentations')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(configService.get('PORT'));
}

bootstrap();
