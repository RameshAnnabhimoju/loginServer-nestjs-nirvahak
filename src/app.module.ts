import { Module } from '@nestjs/common';
import 'reflect-metadata';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule { }