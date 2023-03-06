import { Body, Controller, Get, Headers } from '@nestjs/common';
import { EmployeeService } from './employee.service';
@Controller('employees')
export class EmployeeController {
    constructor(private employeesService: EmployeeService) { }
    @Get('test')
    test() {
        return { message: 'test employees api is working successfully' }
    }

    @Get()
    getEmployee(@Headers('Authorization') dto: string) {
        return this.employeesService.getEmployee(dto);
    }

    // @Get()
    // getAllEmployees(@Headers('Authorization') dto: string) {
    //     return this.employeesService.getAllEmployees(dto);
    // }
}
