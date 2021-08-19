import { BadRequestException, Body, Injectable, Post, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Gstin_Business } from './entites/gst_buss.entity';
import { Response } from 'express';
import { JwtAccessPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { AuthService } from 'src/auth/auth.service';
import { User } from './entites/user.entity';
import { Gstin_Detail } from './entites/gst_detail.entity';
import { Gstin_filing } from './entites/gst_filing.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Gstin_Detail)
    private gstDetailRepo: Repository<Gstin_Detail>,
    @InjectRepository(Gstin_Business)
    private gstBusinessDetailRepo: Repository<Gstin_Business>,
    @InjectRepository(Gstin_filing)
    private gstFilingDetailRepo: Repository<Gstin_filing>,
    private readonly authService: AuthService

  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getOneById(id): Promise<User> {
    try {
      const user = await this.usersRepository.findOneOrFail(id); // SELECT * from user WHERE user.id = id
      // const user = await this.usersRepository.findOne(id); // SELECT * from user WHERE user.id = id
      return user;
    } catch (error) {
      throw new Error('No user found');
    }
  }

  async findAllUser2(req, res) {
    const gst_detail = await this.gstDetailRepo.findOneOrFail({ id: 1 });
    console.log(gst_detail.gstin);
    
    // const gst_business_details_uniq = await this.gstBusinessDetailRepo
    //     .createQueryBuilder('detail')
    //     .where('detail.gstin = :mygst', {mygst: '01AAAFH7915H1ZR'})
    //     .getManyAndCount()
    // console.log(gst_business_details_uniq);
    
    // const gst_business_details = await this.gstBusinessDetailRepo.findOneOrFail(
    //   { id: 1 },
    // );
    // const gst_filing_details = await this.gstFilingDetailRepo.findOneOrFail({
    //   id: 1,
    // });
    const gst_business_details = await this.gstBusinessDetailRepo
      .createQueryBuilder('company')
      .select()
      .where('company.gstin = :mygst', { mygst: gst_detail.gstin })
      .getOne();
    console.log(gst_business_details);
    
    return res.json({gst_business_details})
    // return res.json({
    //   gst_detail,
    //   gst_business_details,
    //   gst_filing_details,
    // });
    // console.log(data);
    // return data;
  }

  async getCompanyBySearch(name, req, res) {
    const companies = await this.gstDetailRepo
      .createQueryBuilder('companies')
      .select()
      .where('companies.lgnm LIKE :lgnm', { lgnm: `%${name}%` })
      .getManyAndCount();

    return res.json({ companies });
  }

  async createUser(name: string, email: string, password: string): Promise<User> {
    const saltOrRounds = 10;
    password = await bcrypt.hash(password, saltOrRounds)
    const newUser = this.usersRepository.create({ name, email, password });
    // Insert the User to db using .save() method
    return this.usersRepository.save(newUser); // Save can also be used to update the user
  }




  async login(@Res() res: Response, body: any): Promise<any> {
  
    const user = await this.usersRepository.findOne({ where: {email: body.email}});    
    if(!user){
      throw new BadRequestException('Invalid Credentials');
    }
    // User found but check the password
    const isMatched = await bcrypt.compare(body.password, user.password);
    if(!isMatched) {
      throw new BadRequestException('Invalid Credentials');
    }

    let jwtAccessPayload: JwtAccessPayload = {name: user.name, id: user.id}
    const access_token = await this.authService.createAccessToken(jwtAccessPayload)
    // let jwtRefreshPayload: JwtRefreshPayload = {userRole: body.userRole, id: user._id}
    // const refresh_token = await this.authService.createRefreshToken(jwtRefreshPayload)
    user.token = access_token;
    await this.usersRepository.save(user); // Save can also be used to update the user

    return res.json({
      success: true,
      msg: "User LoggedIn successfully",
      accessToken: access_token,
      // refreshToken: refresh_token
    })
  }



}

/*
user
watchlist
order
subscription
transaction

*/
