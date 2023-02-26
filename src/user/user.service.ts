import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { UserRegisterDto, UserLoginDto } from './dto';
import { ObjectID, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { InjectRepository } from '@nestjs/typeorm';
dotenv.config()

@Injectable()
export class UserService {
    constructor(
        // @Inject('USER_REPOSITORY')
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }
    async register(dto: UserRegisterDto): Promise<{ message: string, status: number }> {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        try {
            const user = this.userRepository.create({ ...dto, password: hashedPassword });
            await this.userRepository.save(user)
            return { message: 'User registered successfully.', status: HttpStatus.CREATED };
        } catch (error) {
            throw new HttpException({ message: "Internal Server Error", error }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async login(dto: UserLoginDto): Promise<{ token: string }> {
        const { email, password } = dto;
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            if (!user) {
                throw new HttpException({ statusCode: HttpStatus.NOT_FOUND, message: 'User not found' }, HttpStatus.NOT_FOUND);
            }
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, messgae: 'Incorrect password' }, HttpStatus.BAD_REQUEST);
            }
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            return { token };

        } catch (error) {
            if (JSON.stringify(error) === '{}') {
                throw new HttpException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: "Internal Server Error" }, HttpStatus.INTERNAL_SERVER_ERROR)
            } else {
                throw error;
            }
        }
    }

    async getUser(token: string): Promise<User> {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const { id } = decodedToken as { id: ObjectID };
            return await this.userRepository.findOne({ where: { _id: id } });
        } catch (error) {
            throw new HttpException({ message: 'Invalid token', error }, HttpStatus.UNAUTHORIZED);
        }
    }
}
