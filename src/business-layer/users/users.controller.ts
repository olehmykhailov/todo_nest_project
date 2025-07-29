import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponseDto } from './dtos/user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    async getUser(id: string): Promise<UserResponseDto> {
        return this.usersService.getUserById(id);
    }
}
