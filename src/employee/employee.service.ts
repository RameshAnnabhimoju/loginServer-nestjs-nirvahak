import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { Employee } from './entities/employees.entity';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config()
@Injectable()
export class EmployeeService {
    constructor(@InjectRepository(Employee)
    private employeeRepository: Repository<Employee>) { }


    async getEmployee(token: string): Promise<Employee> {
        try {
            try {

                const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                const { id } = decodedToken as { id: ObjectID };
                const employee = await this.employeeRepository.findOne({ where: { _id: id } });
                if (!employee) {
                    throw new HttpException({ statuscode: HttpStatus.UNAUTHORIZED, message: "Unauthorized Access" }, HttpStatus.UNAUTHORIZED)
                }
                return employee;
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
