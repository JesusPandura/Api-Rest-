/*
https://docs.nestjs.com/modules
*/

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm';
import { ClientsService } from 'src/Clients/clients.service';
import { Clients } from 'src/Entities/clients.entity';
import { Consumption } from 'src/Entities/consumption.entity';
import { Payment } from 'src/Entities/payment.entity';
import { PaymentService } from 'src/Payment/payment.service';
import { ConsumptionController } from './consumption.controller';
import { ConsumptionService } from './consumption.service';

@Module({
    imports: [TypeOrmModule.forFeature([Consumption, Clients, Payment])],
    controllers: [ConsumptionController],
    providers: [  ConsumptionService, ClientsService, PaymentService],
    exports: [TypeOrmModule]
})
export class ConsumptionModule {}
