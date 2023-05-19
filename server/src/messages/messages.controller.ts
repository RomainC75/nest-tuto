import { Controller, Get, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {

    @Get()
    listmessages(){
        return "messages"
    }

    @Post()
    createMessage(){

    }

    @Get('/:id')
    getMessage(){

    }
}
