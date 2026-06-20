import { Body, Controller, Delete, Get ,Param,Post,Patch, Query ,ParseIntPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './Dto/createUser.dto';
import { updateUserDto } from './Dto/updateUser.dto';
import { ValidationPipe } from '@nestjs/common';
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Get()  // GET /users
    getallusers(@Query('role') role?: 'intern' | 'admin'){
        return this.usersService.getallusers(role)
    }

    @Get('interns') // GET /users/interns
    getallinterns(){
        return this.usersService.getallinterns()
    }


    @Get(':id') //GET /users/:id
    getuser(@Param('id',ParseIntPipe) id: number){  //parseIntpipe turn to nuber
        return this.usersService.getuser(id)  //+ turn it to number
    }

    @Post()  //POST /users
    create(@Body(ValidationPipe) user:createUserDto){
        return this.usersService.create(user)
    }
 
    @Patch(':id')
    update(@Param('id',ParseIntPipe) id:number,@Body(ValidationPipe) user:updateUserDto){
        return this.usersService.update(id,user)
    }

    @Delete(':id')
     delete(@Param('id',ParseIntPipe) id: number){
        return this.usersService.delete(id)
    }
    
}
