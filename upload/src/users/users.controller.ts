import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersViewService } from './usersview.service';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly userViewService: UsersViewService) {}

  @Get()
  async findOne(@Body() numcpf: number) {
    return this.userViewService.findOne(numcpf);
  }

  @Get('/me')
  async getMe(@Req() req) {
    return this.userViewService.getMe(req.user);
  }
}
