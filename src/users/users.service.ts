import { Injectable, NotFoundException } from '@nestjs/common';
import { createUserDto } from './Dto/createUser.dto';
import { updateUserDto } from './Dto/updateUser.dto';

@Injectable()
export class UsersService {
// constructor(private readonly DBService: DBService){} //db service
private users = [
{id: 1,
name: "user1",
role:"intern"},
{id: 2,
name: "user2",
role:"admin"},
{id: 3,
name: "user3",
role:"ing"}]

getallusers(role?: 'intern' | 'admin'){
    if(role){
        return this.users.filter(user=> user.role === role)
    }
    return this.users
}

getallinterns(){
    return this.users.filter(user => user.role === "intern");
}
getuser(id : number){
    const user = this.users.find(user => user.id === id)
    if(!user) throw new NotFoundException('User Not Found');
    return user
}

create(user: createUserDto){
 const highestId = [...this.users].sort((a,b) => b.id - a.id)
 const newuser = {id: highestId[0].id + 1 , ...user}
 this.users.push(newuser)
return newuser
}
update(id: number,updateduser:updateUserDto){
    this.users.map(user=> {
        if(user.id === id ){
            return {...user,...updateduser}
        }
        return user
    })
    return this.getuser(id)
}
delete(id: number){
    this.users = this.users.filter(user=> user.id !== id)
}
}

