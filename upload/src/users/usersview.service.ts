import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserView } from './entities/user.view';

@Injectable()
export class UsersViewService {
  constructor(
    @InjectRepository(UserView)
    private readonly userViewRepository: Repository<UserView>,
  ) {}

  async findOne(numcpf: number) {
    return this.userViewRepository.find({ numcpf })[0];
  }

  async findUser(numcpf: number) {
    const user = await this.userViewRepository.find({ numcpf });

    if (!user[0]) {
      throw new NotFoundException('User Not Found');
    }

    return user[0];
  }

  async getMe(user) {
    return {
      cpf: user.cpf,
      name: user.name,
    };
  }
}
