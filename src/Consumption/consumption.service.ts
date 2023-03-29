/*
https://docs.nestjs.com/providers#services
*/

import { HttpStatus, Injectable, HttpException, forwardRef  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consumption } from 'src/Entities/consumption.entity';
import { CreateConsumptionDto } from '../Consumption/DTO/CreateConsumption.dto';
import { ClientsService } from 'src/Clients/clients.service';
import { PaymentService } from 'src/Payment/payment.service';

@Injectable()
export class ConsumptionService {
    constructor(@InjectRepository(Consumption) 
    private consumptionRepository: Repository<Consumption>, 
    private clientsService: ClientsService, 
    private paymentService:  PaymentService) { }

    async createConsumption(consumption: CreateConsumptionDto) {
        const date = new Date();
        const clientIDFound = await this.clientsService.getClientByID(consumption.clienteId);
        if (!clientIDFound) { return new HttpException("CLIENT NOT FOUND", HttpStatus.NOT_FOUND) }
        const insertIntake = await this.consumptionRepository.save({
            consumo: consumption.consumo,
            fecha: consumption.fecha,          
            cliente: clientIDFound
        });
        const consum = consumption.consumo
        var total = 0;
        if (consum >=1 && consum <=100)total = consum*150;
        if (consum > 100 && consum <= 300) total = consum*170;
        if (consum > 300) total = 190;

        const clientAge = await (await this.clientsService.getClientByID(consumption.clienteId)).fecha_nacimiento;

        if(this.clientsService.getClientAge(clientAge) >= 50 ){
            total *= .90
        }
        consumption.payment.total = total;
        await this.paymentService.createPayment(consumption.payment, insertIntake);
        return 'Consumo creado'
    }
    
    getConsumption() { //tpdos los consumos
        return this.consumptionRepository.find();
    }
    getConsumo(id: number) { //un consumo
        return this.consumptionRepository.findOne({
            where: {id}
        })
    }


}

