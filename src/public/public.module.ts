import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../employee/entities/employees.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [PublicController],
  providers: [PublicService]
})
export class PublicModule { }
