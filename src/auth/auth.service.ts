import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtAccessPayload, JwtRefreshPayload } from './interfaces/jwt-payload.interface';
import { sign } from 'jsonwebtoken';
import * as dotenv from 'dotenv'
import { v4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entites/user.entity';
import { Repository } from 'typeorm';
import { Refresh_Token } from './entities/refresh-token.entity';
import { RefreshAccessTokenDto } from 'src/user/dto/refresh-access-token.dto';

dotenv.config();

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Refresh_Token)
    private refreshTokenRepo: Repository<Refresh_Token>,
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

  async createRefreshToken(id) {
    let rtoken = v4(); // Create the Refresh token
    // Save the refreshToken to its table
    const newRefToken = this.refreshTokenRepo.create({ rtoken });
    // Save the userId in refresh token table 
    const user = await this.usersRepository.findOneOrFail(id);    
    newRefToken.user = user;
    await this.refreshTokenRepo.save(newRefToken);
    return newRefToken;
}



  async findRefreshToken(token: string) {
    // Add the user role with token when multiple user entity comes
    const refreshToken = await this.refreshTokenRepo
      .createQueryBuilder("Refresh_Token")
      .leftJoinAndSelect("Refresh_Token.user", "user")
      .where("Refresh_Token.rtoken = :myToken", {myToken: token})
      .getOne()
    // console.log("Find Refresh Token: ", refreshToken);
    
    if (!refreshToken) {
      throw new UnauthorizedException('User has been logged out.');
    }
    return refreshToken.user.id;
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
