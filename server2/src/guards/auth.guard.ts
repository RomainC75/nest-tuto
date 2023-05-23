import { CanActivate, ExecutionContext } from "@nestjs/common";
import { ExecException } from "child_process";


export class AuthGuard implements CanActivate{

    canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest()
        // block is userId is falsy ! 
        return request.session.userId
    }
}