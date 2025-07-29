import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/data-layer/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    ) {}

    async findByEmail(email: string): Promise<UserEntity | null> {
        return this.userRepository.findOne({ where: { email, deletedAt: undefined } });
    }

    async findById(id: string): Promise<UserEntity | null> {
        return this.userRepository.findOne(
            { 
                where: 
                    { 
                        id, 
                        deletedAt: undefined 
                    } 
            }
        );
    }

    async createUser(userData: Partial<UserEntity>): Promise<UserEntity> {
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }

    async updateUser(id: string, userData: Partial<UserEntity>) {
        
        return await this.userRepository.update(id, userData);;
    }

    async deleteUser(id: string) {
        return await this.userRepository.update(id, { deletedAt: new Date() });
    }
}
