import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';
import exp from 'constants';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>
  let fakeAuthService: Partial<AuthService>

  beforeEach(async () => {
    fakeUsersService ={
      findOne: (id: number)=>{
        return Promise.resolve({id, email: 'rom.chenard@gmail.com', password: 'azerty'} as User)
      },
      find: (email: string)=>{
        return Promise.resolve([{id:1,email, password:'azerty'} as User])
      },
      // remove: ()=>{

      // },
      // update: ()=>{

      // }
    }
    fakeAuthService = {
      // signup:()=>{

      // },
      signin:(email:string, password: string)=>{
        return Promise.resolve({id:1,email,password} as User)
      }
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers:[
        {
          provide: UsersService,
          // mock the usersService
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          // mock the usersService
          useValue: fakeAuthService,
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('findUser throws an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('findAllUsers returns a list of users with the given email', async()=>{
    const users = await controller.findAllUsers('asdf@asdf.com')
    expect(users.length).toEqual(1)
    expect(users[0].email).toEqual('asdf@asdf.com')
  })

  it('findUser returns a single user with the given id', async ()=>{

    const user = await controller.findUser("1")
    expect(user).toBeDefined()
    expect(user.id).toEqual(1)
  })

  it('findUser throws an error if user with given id is not found', async ()=>{
    fakeUsersService.findOne = (id:number)=>null
    await expect(controller.findUser("1")).rejects.toThrow(NotFoundException)
  })

  it('signin updates session object and returns user', async ()=>{
    const session = {
      userId:null
    }
    const user = await controller.signin({email:'rom.chenard@gmail.com', password:'azer'},session)
    expect(user.id).toEqual(1)
    expect(session?.userId).toEqual(user.id)
  })

});
