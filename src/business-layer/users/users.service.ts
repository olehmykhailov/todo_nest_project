import { Injectable } from '@nestjs/common';
import { UserResponseDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
    async getUserById(id: string): Promise<UserResponseDto> {
        const user = { id, email: '', firstName: 'John', lastName: 'Doe' }; // Simulated user data
        return user;
    }
}
