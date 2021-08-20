import { Refresh_Token } from 'src/auth/entities/refresh-token.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
  
  @Column()
  token: string;

  @OneToMany(() => Refresh_Token, (refresh_tok: Refresh_Token) => refresh_tok.user)
  refresh_tokens: Refresh_Token[];
}
