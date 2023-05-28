import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);

const hashPass = async (password: string): Promise<string> => {
  const salt = randomBytes(8).toString('hex');
  const hash = (await scrypt(password, salt, 32)) as Buffer;
  return salt + '.' + hash.toString('hex');
};

describe('AuthService ', () => {
  // make "service" available in the following tests
  let service: AuthService;
  let fakeUsersService: Partial<UsersService> = {};

  beforeEach(async () => {
    const users: User[] = []
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter(user => user.email === email)
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) =>{
        const user = {id: Math.floor(Math.random()*999999), email, password}
        users.push(user as User)
        return Promise.resolve(user as User)
      }
    };
    // create a new DI container
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          // mock the usersService
          useValue: fakeUsersService,
        },
      ],
    }).compile();
    // create a new instance of authService with dependencies initialized
    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('email@email.com', 'pass');
    console.log('uer : ', user);
    expect(user.password).not.toEqual('pass');

    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    await service.signup('asdf@asdf.com', 'asdf');
    await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });
 
  it('throws if signin is called with an unused email', async () => {
    await expect(
      service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
    ).rejects.toThrow(NotFoundException);
  });
 
  it('throws if an invalid password is provided', async () => {
    await service.signup('laskdjf@alskdfj.com', 'password');
    await expect(
      service.signin('laskdjf@alskdfj.com', 'laksdlfkj'),
    ).rejects.toThrow(BadRequestException);
  });

  it('returns a user if the password is correct', async () => {
    await service.signup('asdf@asdf.com', 'password')

    // fakeUsersService.find = () =>
    //   Promise.resolve([{ email: 'asdf@asdf.com', password: result } as User]);

    const user = await service.signin('asdf@asdf.com', 'password');
    expect(user).toBeDefined();
  });
});
