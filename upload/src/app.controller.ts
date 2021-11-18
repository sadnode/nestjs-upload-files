import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  @Post('upload')
  @UseInterceptors(FilesInterceptor('file'))
  uploadFile(@UploadedFiles() file: Array<Express.Multer.File>) {
    console.log(file);
  }
}
