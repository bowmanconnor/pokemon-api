import { Module } from '@nestjs/common';
import { ConfigModule } from '../infrastructure/config/config.module';
import { ConfigService } from '../infrastructure/config/config.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ConfigModule, MongooseModule.forRootAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => configService.getMongoConfig(),
  }),],
  controllers: [],
  providers: [],
})
export class AppModule { }
