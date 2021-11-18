import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { AppController } from './app.controller';
import { AppService } from './app.service';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
