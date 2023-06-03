import { IsEmail } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { Report } from "src/reports/reports.entity";

console.log(Report)

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @OneToMany(()=> Report, (report)=> report.user)
    reports: Report[];

    @AfterInsert()
    logInsert(){
        console.log('=> inserted user with id : ', this.id)
    }

    @AfterUpdate()
    logUpdate(){
        console.log("Updated User with id", this.id)
    }

    @AfterRemove()
    logRemoved(){
        console.log('=> removed user with id : ', this.id)
    }
}