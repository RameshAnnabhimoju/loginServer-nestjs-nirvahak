import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'reflect-metadata';
import { typeormConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';
import { PublicModule } from './public/public.module';

@Module({
  // imports: [UserModule],
  imports: [UserModule, TypeOrmModule.forRoot(typeormConfig), EmployeeModule, PublicModule]
})
export class AppModule { }