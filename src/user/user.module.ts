import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { userProvider } from './user.provider';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  // imports: [DatabaseModule],
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  // providers: [UserService, ...userProvider]
  providers: [UserService]
})
export class UserModule { }
