import { Controller, Get } from "@nestjs/common";
import { LivelinessService } from "./liveliness.service";

@Controller('liveliness')
export class LivelinessController {
    constructor(private readonly livelinessService: LivelinessService) {}

    @Get("/health")
    checkLiveliness(): string {
        return this.livelinessService.checkLiveliness();
    }
}
