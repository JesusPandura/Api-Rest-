export class CreatePayment{
    id: number;
    id_consumo: number;
    total: number;
    pagado: string;
}
export class CreateConsumption{
    id: number;
    fecha: Date;
    consumo: number;
    id_cliente: number;
}

