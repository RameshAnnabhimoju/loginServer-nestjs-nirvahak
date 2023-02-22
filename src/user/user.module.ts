import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { User } from 'src/user/user.entity';
import { userProvider } from './user.provider';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [User, DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProvider]
})
export class UserModule { }
