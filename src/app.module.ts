import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GatewayGateway } from './gateway/gateway.gateway';
import { GatewayModule } from './gateway/gateway.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UsersModule, GatewayModule, DatabaseModule, UserModule],
  controllers: [AppController],
  providers: [AppService, GatewayGateway],
})
export class AppModule {}
//nest g module name
// all nest g resource users
//nest g gateway name  for websocket controller
//nest g proccessor name for bullmq service
//nest g resource user  create api