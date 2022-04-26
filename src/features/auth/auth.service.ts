import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CryptoService } from '../../shared/crypto/crypto.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const hexPass = this.cryptoService.generate(password);
    return this.userService.findByCond({ email, password: hexPass });
  }

  generateJwtToken(user: Partial<UserEntity>) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return this.jwtService.sign(payload);
  }

  login(user: UserEntity) {
    try {
      const { password, ...userData } = user;
      return {
        ...userData,
        token: this.generateJwtToken(userData),
      };
    } catch (err) {
      throw new UnauthorizedException('Wrong password or email');
    }
  }

  async register(createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      this.logger.log(`User: ${user.email} successfully created`);
      return this.login(user);
    } catch (err) {
      this.logger.error(`User  ${createUserDto.email} already exist`, err);
      throw new ConflictException('User already exist');
    }
  }
}
