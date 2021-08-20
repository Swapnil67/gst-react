import { BadRequestException, Body, Get, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { User } from './entites/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/createUser')
  async createUser(): Promise<User> {
    return this.userService.createUser('Goku', 'aoku@nest.io', 'root');
  }

  @Get()
  async getUser(@Req() req: Request): Promise<User> {
    // console.log(req.query);
    return this.userService.getOneById(req.query.id);
  }

  @Get('/getGstData')
  async findUser2(@Req() req: Request, @Res() res: Response): Promise<any> {
    // console.log(req.query);
    const data = await this.userService.findAllUser2(req, res);
    return data;
  }

  @Get('/getSimilar')
  async findSimilar(@Query() query, @Req() req: Request, @Res() res: Response) {
    console.log(query);    
    const companies = await this.userService.getCompanyBySearch(query.name, req, res);
    return companies;
  }

  @Post('/login')
  async login(@Res() res: Response, @Body() body: any) {
    return this.userService.login(res, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/protected')
  async getProtected(@Req() req: Request) {
    return req.user;
  }

  @Post('refresh-access-token')
  async refreshAccessToken(@Body() body: RefreshAccessTokenDto) {
    return await this.userService.refreshAccessToken(body);
  }

}
