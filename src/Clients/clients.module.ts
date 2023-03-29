import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { Clients } from 'src/Entities/clients.entity';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Consumption } from 'src/Entities/consumption.entity';
/*
https://docs.nestjs.com/modules
*/


@Module({
    imports: [TypeOrmModule.forFeature([Clients, Consumption])],
    controllers: [ClientsController],
    providers: [ClientsService],
    exports: [TypeOrmModule, ClientsService, ClientsModule]
})
export class ClientsModule { }
