import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import {
  CreateUserParams,
  CreateUserPostParams,
  CreateUserProfileParams,
  UpdateUserParams
} from '../../../utils/type';
import { Profile } from 'src/typeorm/entities/Profile';
import { Post } from 'src/typeorm/entities/Post';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>
  ) {}

  findUsers() {
    // return the simple user
    // return this.userRepository.find();
    // return more information regarding the relation (need the key name)
    return this.userRepository.find({ relations: ['profile', 'posts'] });
  }

  createUser(userDetails: CreateUserParams) {
    console.log('=> user details : ', userDetails);
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date()
    });
    return this.userRepository.save(newUser);
  }

  updateUser(id: string, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }

  deleteUser(id: string) {
    console.log('=id : ', id);
    return this.userRepository.delete({ id });
  }

  async createUserProfile(
    id: string,
    createUserProfileDetails: CreateUserProfileParams
  ) {
    const foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    const newProfile = this.profileRepository.create(createUserProfileDetails);
    const saveProfile = await this.profileRepository.save(newProfile);
    foundUser.profile = saveProfile;
    return this.userRepository.save(foundUser);
  }

  async createUserPost(
    id: string,
    createUserPostDetails: CreateUserPostParams
  ) {
    const foundUser = await this.userRepository.findOneBy({ id });
    if (!foundUser) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    const newPost = this.postRepository.create({
      ...createUserPostDetails,
      user: foundUser
    });
    return this.postRepository.save(newPost);
  }
}
