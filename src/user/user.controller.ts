import { Controller, Get, Post, Body, Patch, Param, Delete,Query ,Ip} from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { LoggerService } from 'src/logger/logger.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new LoggerService(UserController.name);
  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Ip() ip: string ,@Query('role') role?: 'intern' | 'admin' | 'engineer') {
    this.logger.log(`new request from \t${ip}`,UserController.name);
    return this.userService.findAll(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
