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
            const employee = this.employeeRepository.create({ ...dto, password: hashedPassword });
            await this.employeeRepository.save(employee)
            return { message: 'employee registered successfully.', status: HttpStatus.CREATED };
        } catch (error) {
            throw new HttpException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: "Internal Server Error", error }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async login(dto: employeeLoginDto): Promise<{ token: string }> {
        const { email, password } = dto;
        try {
            const employee = await this.employeeRepository.findOne({ where: { email } });
            if (!employee) {
                throw new HttpException({ statusCode: HttpStatus.NOT_FOUND, message: 'employee not found' }, HttpStatus.NOT_FOUND);
            }
            const isPasswordValid = bcrypt.compareSync(password, employee.password);
            if (!isPasswordValid) {
                throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, messgae: 'Incorrect password' }, HttpStatus.BAD_REQUEST);
            }
            const token = jwt.sign({ id: employee._id, email: employee.email }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            return { token };

        } catch (error) {
            if (JSON.stringify(error) === '{}') {
                throw new HttpException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: "Internal Server Error", error }, HttpStatus.INTERNAL_SERVER_ERROR)
            } else {
                throw error;
            }
        }
    }
    async getEmployee(token: string): Promise<Employee | object> {
        try {
            try {

                const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                const { id } = decodedToken as { id: ObjectID };
                const employee = await this.employeeRepository.findOne({ where: { _id: id } });
                if (!employee) {
                    throw new HttpException({ statuscode: HttpStatus.UNAUTHORIZED, message: "Unauthorized Access" }, HttpStatus.UNAUTHORIZED)
                }
                return { employee, decodedToken }
            } catch (error) {
                throw new HttpException({ statuscode: HttpStatus.UNAUTHORIZED, message: "Invalid Token" }, HttpStatus.UNAUTHORIZED)
            }
        } catch (error) {
            if (JSON.stringify(error) === '{}') {
                throw new HttpException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: "Internal Server Error", error }, HttpStatus.INTERNAL_SERVER_ERROR)
            } else {
                throw error;
            }
        }
    }
    // async getAllEmployees(dto) { }
}
