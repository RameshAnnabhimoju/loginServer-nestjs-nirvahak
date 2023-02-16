import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterDto, UserLoginDto } from './dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('test')
    test() {
        return { message: 'test server connected successfully' }
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    register(@Body() dto: UserRegisterDto) {
        return this.userService.register(dto);
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    login(@Body() dto: UserLoginDto) {
        return this.userService.login(dto);
    }

    @Get(':token')
    getUser(@Param('token') dto: string) {
        return this.userService.getUser(dto);
    }
}
