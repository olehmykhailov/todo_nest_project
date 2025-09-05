import { Injectable } from '@nestjs/common';

@Injectable()
export class LivelinessService {
    checkLiveliness(): string {
        return 'OK';
    }
}