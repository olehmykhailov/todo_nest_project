import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { TaskEntity } from "./task.entity";

@Entity('users')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 100 })
    password: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    firstName?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    lastName?: string;

    @OneToMany(() => TaskEntity, (task) => task.userId)
    tasks: TaskEntity[];
}