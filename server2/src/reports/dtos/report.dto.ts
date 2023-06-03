import { Expose, Transform } from "class-transformer";

export class Report{
    @Expose()
    id: number;
    @Expose()
    price: number;
    @Expose()
    make: string;
    @Expose()
    model: string;
    @Expose()
    year: number;
    @Expose()
    mileage: number;
    @Expose()
    lat: number;
    @Expose()
    lng: number;

    // create a new property
    @Transform(({obj})=>obj.user.id)
    @Expose()
    userId: number;
}