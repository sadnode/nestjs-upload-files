import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'numcpf',
      passwordField: 'numcad',
    });
  }

  async validate(numcpf: number, numcad: number) {
    const user = await this.authService.validateUser(numcpf, numcad);

    if (!user) {
      throw new UnauthorizedException('CPF or NE incorrect!');
    }

    return user;
  }
}
