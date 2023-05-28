import { Body, Controller, Delete, Get , NotFoundException, Param, Patch, Post, Query, Session, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../reports/dtos/create-user.dto'
import { UpdateUserDto } from '../reports/dtos/update-user.dto';
import { Serialize, SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { UserDto } from '../reports/dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guard';


@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private usersService: UsersService, private authService: AuthService){}

    @Post('/signup')
    async createUser(@Body() body:CreateUserDto, @Session() session: any){
        console.log("body : ", body)
        const user = await this.authService.signup(body.email, body.password)
        session.userId = user.id
        return user
    }

    @Post('/signout')
    signOut(@Session() session: any){
        session.userId = null
    }
    
    @Post('/signin')
    async signin(@Body() body:CreateUserDto, @Session() session: any){
        const user = await this.authService.signin(body.email, body.password)
        session.userId = user.id
        return user
    }

    // @Get('/whoami')
    // whoAmI(@Session() session: any){
    //     return this.usersService.findOne(session.userId)
    // }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: User){
        // @CurrentUser get info about the user through CurrentInterceptor
        return user
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
