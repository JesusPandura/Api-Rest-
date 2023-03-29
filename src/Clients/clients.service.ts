/*
https://docs.nestjs.com/providers#services
*/

import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clients } from 'src/Entities/clients.entity';
import { Repository } from 'typeorm';
import { CreateClientDto } from '../Clients/DTO/CreateClient.dto';
import { HttpException } from '@nestjs/common';
import { ALL } from 'dns';

@Injectable()
export class ClientsService {
    constructor(@InjectRepository(Clients) private clientsRepository: Repository<Clients>) { }

    async createClient(client: CreateClientDto) { //Crear cliente
        const clientIdFound = await this.clientsRepository.findOne({
            where: {
                id: client.id
            }
        })
        if (clientIdFound) { return new HttpException("El cliente ya existe.", HttpStatus.CONFLICT) }
        const clientCorreoFound = await this.clientsRepository.findOne({
            where: {
                correo: client.correo
            }
        })
        if (clientCorreoFound) { return new HttpException("El cliente ya existe.", HttpStatus.CONFLICT) }
        const newClient = this.clientsRepository.create(client);
        return this.clientsRepository.save(newClient);
    }
    getClients() { //Obtener todos los clientes
        return this.clientsRepository.find();
    }
    async getClient(correo: string) { //Obtener cliente por correo
        const clientCorreoFound = await this.clientsRepository.findOne({
            where: {
                correo,
            }
        });
        if (!clientCorreoFound) {
            return new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND);
        }
        return clientCorreoFound;

    }
    async getClientByID(id: number) { //Obtener cliente por ID
        const clientIDFound = await this.clientsRepository.findOne({
            where: {
                id: id
            }
        });
        return clientIDFound;

    }

    getClientAge(birthdate) {
        let today = new Date()
        let clientBirthdDate = new Date(birthdate)
        let age = today.getFullYear() - clientBirthdDate.getFullYear()
        let difMonths = today.getMonth() - clientBirthdDate.getMonth()
        if (difMonths < 0 || (difMonths === 0 && today.getDate() < clientBirthdDate.getDate())) {
            age--
        }
        return age
    }
     getClientPaid() { //reporte cientes q pagaron
        return this.clientsRepository.find({
            relations: ['consumptions', 'consumptions.pagos'],
            where: { consumptions: { pagos: { pagado: true } } }
        })
    }
    getClientNotPaid() { //reporte clientes q no han pagado
        return this.clientsRepository.find({
            relations: ['consumptions', 'consumptions.pagos'],
            where: { consumptions: { pagos: { pagado: false } } }

        })
    }
    async getConsumoCliente(id: number){ //reporte de detalles de consumo por cliente. A
        const consumptionFound = await this.clientsRepository.findOne({            
            relations: ['consumptions', 'consumptions.pagos'],
            where: {id} 
        })
        if(!consumptionFound) return 'Consumo no encontrado';
        return consumptionFound
    }
    async getClientLowConsum(){
        return await this.clientsRepository.find({
            take:1, relations:{consumptions:true}, order:{consumptions:{consumo:'asc'}}
        })
    }

    async getClientHighConsum(){
        return await this.clientsRepository.find({
            take:1, relations:{consumptions:true}, order:{consumptions:{consumo:'desc'}}
        })
    }
    
    async getClientTotalConsum(){
        return await this.clientsRepository.find({
            take:ALL, relations:{consumptions:true}, order:{consumptions:{consumo:'DESC'}}
        })
    }
    

}
