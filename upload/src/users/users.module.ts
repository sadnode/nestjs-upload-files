import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UserView } from './entities/user.view';
import { UsersViewService } from './usersview.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserView])],
  controllers: [UsersController],
  providers: [UsersViewService],
  exports: [UsersViewService],
})
export class UsersModule {}
