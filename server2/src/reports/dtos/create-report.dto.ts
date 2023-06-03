import { IsNumber, IsString, Min, Max, IsLongitude, IsLatitude } from "class-validator"

export class CreateReportDto{
    @IsNumber()
    @Min(0)
    @Max(1_000_000)
    price: number;
    
    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(2050)
    year: number;

    
    @IsNumber()
    @Min(0)
    @Max(1_000_000)
    mileage: number;
    
    @IsLatitude()
    lat: number;
    
    @IsLongitude()
    lng: number;
}