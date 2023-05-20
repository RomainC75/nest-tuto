import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Report{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;
    // @Column()
    // make: string;

    // @Column()
    // model: string;

    // @Column()
    // mileage: number;

    // @Column()
    // longitude: number;

    // @Column()
    // latitude: number;
}