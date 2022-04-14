import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { CryptoService } from '../../shared/crypto/crypto.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private cryptoService: CryptoService,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      password: this.cryptoService.generate(createUserDto.password),
    };
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  async findById(id: number) {
    const find = await this.userRepository.findOne(+id);

    if (!find) {
      throw new NotFoundException('No user found');
    }
    return find;
  }

  findByCond(cond: LoginUserDto) {
    return this.userRepository.findOne(cond);
  }
}
