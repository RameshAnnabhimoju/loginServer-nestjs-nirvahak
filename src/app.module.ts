import { Module } from '@nestjs/common';
import 'reflect-metadata';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
@Module({
  imports: [UserModule, TypeOrmModule.forRoot(typeormConfig)],
})
export class AppModule { }
