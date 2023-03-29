import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ConsumptionService } from './consumption.service';
import { CreateConsumptionDto } from './DTO/CreateConsumption.dto';
import { validateBool, validateDate, validateEmptyField, validateOnlyLetters, validateOnlyNumbers } from "src/Validaciones/validaciones";

@Controller('consumption')
export class ConsumptionController {
    constructor(private consumptionService: ConsumptionService ){}
    @Get('/get_consumptions')
    getConsumption(){ //todos los consumoss
        return this.consumptionService.getConsumption();
    }
    @Get('/get_consumption_by_id/:id')
    getConsumo(@Param(':id') id: number) { //un consumo
        return this.consumptionService.getConsumo(id);
    }
    @Post()
    createConsumption(@Body() consumption: CreateConsumptionDto){
        if(validateEmptyField(consumption.clienteId)) return "missing clienteId";
        if(validateOnlyNumbers(consumption.consumo)) return "consumo accept only numbers";
        if(validateDate(consumption.fecha)) return "wrong date format. (yyyy-mm-dd)";
        if(validateBool(consumption.payment)) return "payment only accept true or false";
        try{
            return this.consumptionService.createConsumption(consumption);

        }catch(error){
            return "check that the information is correct"

        }
        
    }
}
