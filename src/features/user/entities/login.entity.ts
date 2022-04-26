import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class LoginEntity {
  @ApiProperty()
  @Column('varchar', { unique: true })
  email: string;

  @ApiProperty()
  @Column('varchar')
  password: string;
}
