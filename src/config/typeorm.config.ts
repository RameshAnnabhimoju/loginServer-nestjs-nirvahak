import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import * as dotenv from 'dotenv';
dotenv.config()
export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  url: process.env.MONGO_URL,
  port: 8080,
  database: 'test',
  useUnifiedTopology: true,
  useNewUrlParser: true,
  autoLoadEntities: true,
  logging: true,
  entities: [User],
  synchronize: true,
  ssl: true,
  authSource: 'admin'
};
