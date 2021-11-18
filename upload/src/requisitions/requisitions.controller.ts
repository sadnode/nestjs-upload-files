import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateRequisitonDto } from './dtos/create-requisition.dto';
import { RequisitionsService } from './requisitions.service';

@Controller('requisitions')
@UseGuards(AuthGuard('jwt'))
export class RequisitionsController {
  logger = new Logger(RequisitionsController.name);

  constructor(private readonly requisitionsService: RequisitionsService) {}

  @Get(':numcad')
  async findByCpf(@Param() param) {
    return this.requisitionsService.findByCpf(param.numcad);
  }

  @Post()
  async create(
    @Body() createRequisitionDto: CreateRequisitonDto,
    @Req() req: any,
  ) {
    console.log(createRequisitionDto);
    // return this.requisitionsService.create(createRequisitionDto, req.user);
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }
}
