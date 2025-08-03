import { Controller, Get, Body, Patch, Delete, Param , UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UserResponseDto } from './dtos/user.response.dto';
import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiBearerAuth()
    @ApiBody({
        type: UserResponseDto,
        description: 'Retrieve user by ID',
    })
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async getUser(id: string): Promise<UserResponseDto> {
        return this.usersService.getUserById(id);
    }

    @ApiBearerAuth()
    @ApiBody({
        type: UserResponseDto,
        description: 'Update user data',
    })
    @UseGuards(AuthGuard('jwt'))
    @Patch(':id')
    async updateUser(@Body() userData: Partial<UserResponseDto>, @Param('id') id: string) {
        return this.usersService.updateUser(id, userData);
    }

    @ApiBearerAuth()
    @ApiBody({
        type: String,
        description: 'Delete user by ID',
    })
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(id);
    }
}
