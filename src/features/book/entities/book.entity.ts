import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('books')
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  title: string;

  @Column('varchar')
  authorName: string;

  @Column('varchar')
  genre: string;

  @Column('varchar')
  date: number;

  @Column('varchar')
  description: string;

  @Column('bytea', { nullable: true })
  picture: Uint8Array | string;

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;
}
