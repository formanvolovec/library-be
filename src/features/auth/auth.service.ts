import {
  ConflictException,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CryptoService } from '../../shared/crypto/crypto.service';
import { ExceptionHandler } from '@nestjs/core/errors/exception-handler';
import { validate } from 'class-validator';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name); //логгирование
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
    const { password, ...userData } = user;
    return {
      ...userData,
      token: this.generateJwtToken(userData),
    };
  }

  async register(createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      this.logger.log(`User: ${user.email} successfully created`); //логгирование
      return this.login(user);
    } catch (err) {
      this.logger.error(`User  ${createUserDto.email} already exist`, err);
      throw new ConflictException('User already exist');
    }
  }
}
