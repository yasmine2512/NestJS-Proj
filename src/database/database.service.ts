import { Injectable ,OnModuleDestroy,OnModuleInit} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class DatabaseService implements OnModuleInit,OnModuleDestroy{
  public prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient(); 
  }
async onModuleInit() {
    await this.prisma.$connect();
}

 async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}
