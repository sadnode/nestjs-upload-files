import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserView } from '../users/entities/user.view';
import { UsersViewService } from '../users/usersview.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userViewService: UsersViewService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    const payload = {
      sub: user.numcpf,
      ne: user.numcad,
      name: user.nomfun,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        name: user.nomfun,
        cpf: user.numcpf,
        ne: user.numcad,
      },
    };
  }

  async validateUser(numcpf: number, numcad: number) {
    let user: UserView;

    try {
      user = await this.userViewService.findUser(numcpf);
    } catch (error) {
      return null;
    }

    if (Number(user.numcad) !== numcad) {
      return null;
    }

    return user;
  }
}
