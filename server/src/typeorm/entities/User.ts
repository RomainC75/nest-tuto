import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  //   @Column({ default: new Date() })
  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;
}
