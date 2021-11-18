import { join } from 'path';
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { diskStorage } from 'multer';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { MailModule } from './mail/mail.module';
import { UsersModule } from './users/users.module';
import { RequisitionsModule } from './requisitions/requisitions.module';
import { AuthModule } from './auth/auth.module';
import { DependentsModule } from './dependents/dependents.module';

export const myStorage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

@Module({
  imports: [
    MulterModule.register({
      storage: myStorage,
    }),
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'oracle',
      port: 1521,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      connectString: process.env.TYPEORM_CONNECT_STRING,
      entities: ['**/**/entities/*.js'],
      synchronize: false,
      logging: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    UsersModule,
    DependentsModule,
    RequisitionsModule,
    AuthModule,
    UsersModule,
    RequisitionsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
