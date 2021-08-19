import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtAccessPayload } from './interfaces/jwt-payload.interface';
import { sign } from 'jsonwebtoken';
import * as dotenv from 'dotenv'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entites/user.entity';
import { Repository } from 'typeorm';

dotenv.config();

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createAccessToken(jwtAccessPayload: JwtAccessPayload) {
    // const accessToken = this.jwtService.sign({userId});
    const accessToken = sign({jwtAccessPayload}, process.env.JWT_SECRET , { expiresIn: process.env.JWT_EXPIRATION });
    return accessToken;
  }

  async validateUser(jwtAccessPayload: JwtAccessPayload) {
    // console.log("jwt Payload ", jwtAccessPayload);  //{ name: Goku, id: 1 }
    
    try {
      const user = await this.usersRepository.findOneOrFail(jwtAccessPayload.id); // SELECT * from user WHERE user.id = id
      // const user = await this.usersRepository.findOne(id); // SELECT * from user WHERE user.id = id
      return user;
    } catch (error) {
      throw new Error("jwt No user found");
    }
  }

    //   ┬┬ ┬┌┬┐  ┌─┐─┐ ┬┌┬┐┬─┐┌─┐┌─┐┌┬┐┌─┐┬─┐
    //   ││││ │   ├┤ ┌┴┬┘ │ ├┬┘├─┤│   │ │ │├┬┘
    //  └┘└┴┘ ┴   └─┘┴ └─ ┴ ┴└─┴ ┴└─┘ ┴ └─┘┴└─
    private jwtExtractor(request: { headers: { authorization: string; }; header: { authorization: any; }; body: { token: string; }; query: { token: any; }; }) {
      let token = null;
      if (request.headers.authorization) {
          // both works but we use 2nd one to remove any extra spaces added bymistakely
          // token = request.headers.authorization.replace('Bearer ', '');
          token = request.headers.authorization.replace('Bearer ', '').replace(' ', '');
          console.log(token);
          
      } else if (request.body.token) {
          token = request.body.token.replace(' ', '');
      }
      if (request.query.token) {
          token = request.body.token.replace(' ', '');
      }
      if (token) {
          try {
              token = token;
          } catch (err) {
              throw new BadRequestException('Bad request.');
          }
      }
      return token;
    }


  // ***********************
  // ╔╦╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗╔═╗
  // ║║║║╣  ║ ╠═╣║ ║ ║║╚═╗
  // ╩ ╩╚═╝ ╩ ╩ ╩╚═╝═╩╝╚═╝
  // ***********************
  returnJwtExtractor() {
      return this.jwtExtractor;
  }

}
