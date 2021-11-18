import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { BodyDto } from './dtos/body.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('file'))
  uploadFile(
    @UploadedFiles() file: Array<Express.Multer.File>,
    @Body() body: BodyDto,
  ) {
    console.log(file);
    console.log(body);
    console.log(body.email);
    console.log(body.name);
  }
}
