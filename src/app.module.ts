import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import * as path from 'path';
import { AcceptLanguageResolver, I18nModule, HeaderResolver } from 'nestjs-i18n';
import { LoggerModule } from 'nestjs-pino';

import environmentVariablesSchema from './core/config/environment-variable.schema';
import { MongooseConfigService, SupportedLanguages } from './core';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: environmentVariablesSchema,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    I18nModule.forRoot({
      fallbackLanguage: SupportedLanguages.EN,
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        {
          use: HeaderResolver,
          options: 'lang',
        },
        AcceptLanguageResolver,
        new HeaderResolver(['lang']),
      ],
    }),
    AuthModule,
    UsersModule,
    CoreModule,
    TodoModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
