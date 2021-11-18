import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DependentsController } from './dependents.controller';
import { DependentsViewService } from './dependents.service';
import { DependentsView } from './entities/dependents.view';

@Module({
  imports: [TypeOrmModule.forFeature([DependentsView])],
  controllers: [DependentsController],
  providers: [DependentsViewService],
  exports: [DependentsViewService],
})
export class DependentsModule {}
