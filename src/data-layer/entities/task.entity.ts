import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity('tasks')
export class TaskEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'boolean', default: false })
    completed: boolean;

    @Column({ type: 'uuid' })
    userId: string;

    @ManyToOne(() => UserEntity, (user) => user.tasks)
    @JoinColumn({ name: 'userId' })
    user: UserEntity;
}