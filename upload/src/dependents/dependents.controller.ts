import { Controller, Get, Logger, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DependentsViewService } from './dependents.service';

@Controller('dependents')
@UseGuards(AuthGuard('jwt'))
export class DependentsController {
  logger = new Logger(DependentsController.name);
  constructor(private readonly dependentsViewService: DependentsViewService) {}

  @Get(':numcpf')
  async findDependets(@Param() param) {
    return this.dependentsViewService.findDependents(param.numcpf);
  }
}
