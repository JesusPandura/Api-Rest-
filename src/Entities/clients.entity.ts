import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { Consumption } from './consumption.entity';
@Entity()
export class Clients {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string
    @Column({ unique: true })
    correo: string
    @Column({ default: null })
    telefono: string
    @Column()
    domicilio: string
    @Column({ type: 'datetime' })
    fecha_nacimiento: Date;
    @OneToMany(() => Consumption, consumo => consumo.cliente)
    consumptions: Consumption[]
}