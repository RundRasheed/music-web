import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);
  constructor(private readonly jwtService: JwtService) {}

  generateToken(userId: string, name: string, role: string): string {
    const payload = { sub: userId, username: name, role: role };
    const token = this.jwtService.sign(payload);

    this.logger.debug(`Generated JWT token for user ${name}: ${token}`);
    return token;
  }
}
