import { IsString, IsBoolean } from "class-validator";

export class TaskResponseDto {
    @IsString()
    id: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsBoolean()
    completed: boolean;

    @IsString()
    userId: string;
}