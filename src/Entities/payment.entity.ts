import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Consumption } from "./consumption.entity";
@Entity()
export class Payment{
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Consumption, consumo=> consumo.pagos)
    consumo: Consumption
    @Column()
    total: number;
    @Column()
    pagado: boolean;
}