import { Module } from "@nestjs/common";
import { LivelinessController } from "./liveliness.controller";
import { LivelinessService } from "./liveliness.service";

@Module({
    imports: [],
    controllers: [LivelinessController],
    providers: [LivelinessService]
})
export class LivelinessModule {}