import { User } from 'src/user/entites/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Refresh_Token {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  rtoken: string;

  @ManyToOne(() => User, (user: User) => user.refresh_tokens)
  user: User;
}
