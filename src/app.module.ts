import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './Clients/clients.module';
import { Connection } from './Configs/DBConnection';
import { ClientsService } from './Clients/clients.service';
import { ConsumptionModule } from './Consumption/consumption.module';
import { ConsumptionService } from './Consumption/consumption.service';
import { PaymentService } from './Payment/payment.service';
import { ConfigModule } from '@nestjs/config'

@Module({
 imports: [ConfigModule.forRoot({ envFilePath: process.env.NODE_ENV === 'docker' ? '.env' : '.local.env' }),
 Connection, ConsumptionModule, ClientsModule],
  controllers: [AppController],
  providers: [AppService, ClientsService, ConsumptionService, PaymentService],
})
export class AppModule { }
