import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Clients } from 'src/Entities/clients.entity';
import { validateOnlyLetters, validatePhone, validateDate, validateEmail } from 'src/Validaciones/validaciones';
import { CreateClientDto } from '../Clients/DTO/CreateClient.dto';
import { ClientsService } from './clients.service';


@Controller('clients')
export class ClientsController {
    constructor(private clientService: ClientsService){

    }
    @Get('/all')
    getClients(): Promise<Clients[]> {
        return this.clientService.getClients();
    }
    @Get('/get_client_by_mail/:correo')
    getClient(@Param('correo') correo:string) {
        return this.clientService.getClient(correo);
    }
    @Get('/get_client/:id')
    getClientById(@Param('id') id: number) {
        return this.clientService.getClientByID(id);
    }
    @Get('/paid')
    getClientPaid(): Promise<any> | string{
        try {
            const clientpayment = this.clientService.getClientPaid()
            return clientpayment
        } catch (error) {
            return 'no hay información. ' + error
        }
    }
    @Get('/not_paid')
    getClientNotPaid(): Promise<any> | string{
        try {
            const clientpayment = this.clientService.getClientNotPaid()
            return clientpayment
        } catch (error) {
            return 'no hay cliente que deba.' + error
        }
    }
    @Get('get_consumo_cliente/:id')
    getConsumoCliente(@Param('id') id: number): Promise<any> |String{
        try{
            const consumosCliente = this.clientService.getConsumoCliente(id)            
            return consumosCliente
        }catch(error){
            return 'No existe el cliente'
        }
    }
    @Get("/obtenerMinimo")
    getLowerConsum(){
        return this.clientService.getClientLowConsum()
    }

    @Get("/obtenerMaximo")
    getHighestConsum(){
        return this.clientService.getClientHighConsum()
    }

    @Get("/obtenerTotalConsumos")
    getTotalConsum(){
        return this.clientService.getClientTotalConsum()
    }

    @Post()
    createClient(@Body() newClient: CreateClientDto): String | Boolean { 
        if(validateOnlyLetters(newClient.nombre)) return "wrong name format";
        if(validatePhone(newClient.telefono)) return "wrong phone number format";
        if(validateDate(newClient.fecha_nacimiento)) return "wrong date format";
        if(validateEmail(newClient.correo)) return "wrong email format"
        try{
            this.clientService.createClient(newClient);  
            return true;
        }catch(HttpException){
            console.log("Error")
        }
        
    }
}
