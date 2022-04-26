import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../../shared/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('varchar')
  username: string;

  @ApiProperty()
  @Column('varchar', { unique: true })
  email: string;

  @ApiProperty()
  @Column('varchar')
  password: string;

  @ApiProperty()
  @Column('enum', { enum: Role, default: Role.DEFAULT })
  role: Role;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;
}
