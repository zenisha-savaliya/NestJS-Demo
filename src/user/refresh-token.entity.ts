import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserDTO } from '../user/user-DTO';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @ManyToOne(() => UserDTO)
  user: UserDTO;

  @Column()
  userId: number;

  @Column({ default: false })
  isRevoked: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
