import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'reflect-metadata';
import { typeormConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';

@Module({
  // imports: [UserModule],
  imports: [UserModule, TypeOrmModule.forRoot(typeormConfig)]
})
export class AppModule { }