import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import * as dotenv from 'dotenv';
dotenv.config()
export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.MONGO_URL,
  database: 'cluster0',
  useUnifiedTopology: true,
  useNewUrlParser: true,
  logging: true,
  entities: [User],
  synchronize: true,
};
