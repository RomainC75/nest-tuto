import {
    ExecutionContext,
    createParamDecorator
} from '@nestjs/common'

export const CurrentUser = createParamDecorator(
    // context is a wrapper around incoming requests
    // ExecutionContext : could be websocket/grpc/http...
    // Request is just HTTP !
    (data: never, context: ExecutionContext) =>{
        const request = context.switchToHttp().getRequest()
        console.log(request.session.userId)
        return 'hi !'
    }
)