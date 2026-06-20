import { createUserDto } from "./createUser.dto";
import {PartialType} from "@nestjs/mapped-types"
export class updateUserDto extends PartialType(createUserDto){}