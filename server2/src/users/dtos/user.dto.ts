import { Expose } from "class-transformer";

// default way
export class UserDto{

    @Expose()
    id: number;

    @Expose()
    email: string
}