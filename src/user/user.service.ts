import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
   constructor(private readonly databaseService: DatabaseService) {}

  create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.prisma.user.create({data:createUserDto});
  }

  findAll(role?: 'intern' | 'admin' |'engineer') {
    if(role){
    return this.databaseService.prisma.user.findMany({
      where:{
        role,
      }})}
      return this.databaseService.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.databaseService.prisma.user.findUnique({
      where:{
        id,
      }
    })
  }

  update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.databaseService.prisma.user.update({
      where:{
        id,
      },
      data: updateUserDto,
    })
  }

  remove(id: number) {
    return this.databaseService.prisma.user.delete({
      where:{
        id,
      }
    })
  }
}
