import {Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToMany} from 'typeorm';
import { Clients } from './clients.entity';
import { Payment } from './payment.entity';
@Entity()
export class Consumption{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type:'datetime'})
    fecha: Date;
    @Column()
    consumo: number;
    @ManyToOne(() => Clients, cliente=> cliente.consumptions)
    cliente: Clients
    @OneToMany(() => Payment, pago => pago.consumo)
    pagos: Payment[]
}