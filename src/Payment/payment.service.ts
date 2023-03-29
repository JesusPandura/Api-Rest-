import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Consumption } from 'src/Entities/consumption.entity';
import { Payment } from 'src/Entities/payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './DTO/CreatePayment.dto';

@Injectable()
export class PaymentService {
    constructor (@InjectRepository(Payment) private paymentRepository: Repository<Payment>){}
    async createPayment(payment: CreatePaymentDto, consumption: Consumption){
        /*const consumptionFound = await this.consumptionService.getConsumo(payment.consumoId);
        if(!consumptionFound){return new HttpException('Consumo no encontrado', HttpStatus.NOT_FOUND)}*/
        await this.paymentRepository.insert({
            consumo: consumption,
            total: payment.total,
            pagado: payment.pagado
        });
        
    }
    getPayments(){
        return this.paymentRepository.find();
    }
    getPayment(){
        return this.paymentRepository.findOne({});
    }
}
