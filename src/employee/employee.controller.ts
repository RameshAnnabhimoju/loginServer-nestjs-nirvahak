import { Body, Controller, Get, Headers, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { employeeRegisterDto, employeeLoginDto } from './dto';
@Controller('employees')
export class EmployeeController {
    constructor(private employeesService: EmployeeService) { }
    @Get('test')
    test() {
        return { message: 'test server connected successfully' }
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    register(@Body() dto: employeeRegisterDto) {
        return this.employeesService.register(dto);
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    login(@Body() dto: employeeLoginDto) {
        return this.employeesService.login(dto);
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
