import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserDTO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}
