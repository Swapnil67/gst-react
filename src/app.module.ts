import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import config from '../ormconfig';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(config), AuthModule],
})
export class AppModule {}
