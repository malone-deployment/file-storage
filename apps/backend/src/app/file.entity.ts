import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    nullable: true,
  })
  date: string;

  @Column({
    type: 'bytea',
    nullable: true,
  })
  image: Buffer;
}
