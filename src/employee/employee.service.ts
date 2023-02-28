import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { employeeLoginDto, employeeRegisterDto } from './dto';
import { Employee } from './entities/employees.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config()
@Injectable()
export class EmployeeService {
    constructor(@InjectRepository(Employee)
    private employeeRepository: Repository<Employee>) { }

    async register(dto: employeeRegisterDto): Promise<{ message: string, status: number }> {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        try {
            const user = this.employeeRepository.create({ ...dto, password: hashedPassword });
            await this.employeeRepository.save(user)
            return { message: 'User registered successfully.', status: HttpStatus.CREATED };
        } catch (error) {
            throw new HttpException({ message: "Internal Server Error", error }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async login(dto: employeeLoginDto): Promise<{ token: string }> {
        const { email, password } = dto;
        try {
            const user = await this.employeeRepository.findOne({ where: { email } });
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
    async getEmployee(token: string): Promise<Employee> {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const { id } = decodedToken as { id: ObjectID };
            return await this.employeeRepository.findOne({ where: { _id: id } });
        } catch (error) {
            throw new HttpException({ message: 'Invalid token', error }, HttpStatus.UNAUTHORIZED);
        }
    }
    // async getAllEmployees(dto) { }
}
