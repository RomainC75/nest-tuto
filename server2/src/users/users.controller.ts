import { Body, Controller, Delete, Get , NotFoundException, Param, Patch, Post, Query, ClassSerializerInterceptor, UseInterceptors, Session } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/reports/dtos/create-user.dto';
import { UpdateUserDto } from 'src/reports/dtos/update-user.dto';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from 'src/reports/dtos/user.dto';
import { AuthService } from './auth.service';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService){}

    @Post('/signup')
    createUser(@Body() body:CreateUserDto){
        console.log("body : ", body)
        return this.authService.signup(body.email, body.password)
    }

    @Post('/signin')
    signin(@Body() body:CreateUserDto){
        return this.authService.signin(body.email, body.password)
    }


    @Get('/:id')
    async findUser(@Param("id") id: string){
        console.log("handler running ...")
        const user = await this.usersService.findOne( parseInt(id))
        if(!user){
            throw new NotFoundException('user not found')
        }   
        return user
    }

    @Get()
    findAllUsers(@Query('email') email:string){
        return this.usersService.find(email)
    }

    @Delete("/:id")
    deleteUser(@Param('id') id: string){
        return this.usersService.remove(parseInt(id))
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() updateUser: UpdateUserDto){
        return this.usersService.update(parseInt(id), updateUser)
    }
}
