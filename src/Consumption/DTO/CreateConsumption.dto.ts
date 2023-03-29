import { Clients } from "src/Entities/clients.entity";
import { Payment } from "src/Entities/payment.entity";
import { CreatePaymentDto } from "src/Payment/DTO/CreatePayment.dto";

export interface CreateConsumptionDto{
    fecha: Date;
    consumo: number;
    clienteId: number;
    payment: CreatePaymentDto;
}