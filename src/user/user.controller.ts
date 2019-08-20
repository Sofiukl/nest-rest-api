import { UserService } from "./user.service";
import { Controller, Get, Post, Body, UseGuards } from "@nestjs/common";
import { User } from "./user.decorator";
import { UserDTO } from "./user.dto";
import { AuthGuard } from "../shared/auth.guard";

@Controller()
export class UserController {
    
    constructor(
        private userService: UserService
    ) {}

    @Get('api/users/:username')
    @UseGuards(new AuthGuard())
    showMe(@User('username') username: string) {
        return this.userService.read(username);
    }

    @Post('auth/register')
    register(@Body() data: UserDTO) {
        return this.userService.register(data);
    }
}