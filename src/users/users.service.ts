import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'John Doe', phone: '1234567890' },
    { id: 2, name: 'Jane Smith', phone: '9876543210' },
  ];

  create(user: User): User {
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | string {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      return 'User not found';
    }
    return user;
  }

  update(id: number, user: User): User | string {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users[index] = user;
      return user;
    }
    return 'User not found';
  }

  delete(id: number): string {
    const deletedUser = this.users.find((user) => user.id === id);
    console.log('Deleted user:', deletedUser);
    if (!deletedUser) {
      return 'User not found';
    }
    this.users = this.users.filter((user) => user.id !== id);
    return 'User deleted';
  }
}
