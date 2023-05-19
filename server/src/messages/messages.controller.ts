import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesController {

    @Get()
    listmessages(){
        return "messages"
    }

    @Post()
    createMessage(@Body() body:CreateMessageDto){
        console.log('body : ', body)
    }

    @Get('/:id')
    getMessage(@Param('id') id: string){
        console.log('param : ', id)
    }
}
