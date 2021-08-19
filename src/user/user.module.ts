import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './entites/user.entity';
import { Gstin_Detail } from './entites/gst_detail.entity';
import { Gstin_Business } from './entites/gst_buss.entity';
import { Gstin_filing } from './entites/gst_filing.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Gstin_Detail]),
    TypeOrmModule.forFeature([Gstin_Business]),
    TypeOrmModule.forFeature([Gstin_filing]),
    AuthModule
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
