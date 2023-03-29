import {TypeOrmModule} from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import {Clients} from 'src/Entities/clients.entity';
import { Consumption } from "src/Entities/consumption.entity";
import { Payment } from "src/Entities/payment.entity";

export const Connection = TypeOrmModule.forRootAsync({
    imports: [ConfigModule.forRoot()],
    useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Clients, Consumption, Payment],
        synchronize: true
    }), inject:[ConfigService]
}) 