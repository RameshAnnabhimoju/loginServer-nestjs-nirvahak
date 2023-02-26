import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'reflect-metadata';
import { typeormConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { EmployeesModule } from './employees/employees.module';

@Module({
  // imports: [UserModule],
  imports: [UserModule, TypeOrmModule.forRoot(typeormConfig), EmployeesModule]
})
export class AppModule { }