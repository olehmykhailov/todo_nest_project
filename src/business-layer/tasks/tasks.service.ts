import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    async getTask(id: string): Promise<any> {
        
        return { id, title: 'Sample Task', description: 'This is a sample task description.' };
    }
}
