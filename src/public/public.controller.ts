import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { employeeLoginDto, employeeRegisterDto } from 'src/employee/dto';
import { PublicService } from './public.service';

@Controller()
export class PublicController {
    constructor(private publicService: PublicService) { }
    @Get('test')
    test() {
        return { message: 'test public api is working successfully' }
    }
    @Post('register')
    @UsePipes(new ValidationPipe())
    register(@Body() dto: employeeRegisterDto) {
        return this.publicService.register(dto);
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    login(@Body() dto: employeeLoginDto) {
        return this.publicService.login(dto);
    }
}
