import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs'
import { plainToClass } from 'class-transformer'

interface ClassConstructor{
    new (...args: any[]):{}
}

export function Serialize(dto: ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto: any){}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // run something before the request
        

        return next.handle().pipe(
            // run something before the response
            map((data: any)=>{
                return plainToClass(this.dto,data,{
                    excludeExtraneousValues: true
                })
            })
        )
    }
}