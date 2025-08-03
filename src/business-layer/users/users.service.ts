import { Injectable } from '@nestjs/common';
import { UserResponseDto } from './dtos/user.response.dto';
import { UsersRepositoryProvider } from 'src/data-layer/providers/user.repository.provider';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepositoryProvider
    ) {}
    async getUserById(id: string): Promise<UserResponseDto> {
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        const userResponse = new UserResponseDto();
        userResponse.id = user.id;
        userResponse.email = user.email;
        userResponse.firstName = user.firstName;
        userResponse.lastName = user.lastName;
        return userResponse;
    }


    async updateUser(id: string, userData: Partial<UserResponseDto>) {
        const updatedUser = await this.usersRepository.updateUser(id, userData);
        if (!updatedUser) {
            throw new Error('User not found or update failed');
        }
        return updatedUser;
    }
    async deleteUser(id: string) {
        const result = await this.usersRepository.deleteUser(id);
        if (!result.affected) {
            throw new Error('User not found or delete failed');
        }
        return { message: 'User deleted successfully' };
    }
}
