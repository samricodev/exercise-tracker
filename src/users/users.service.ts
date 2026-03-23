import { Injectable } from '@nestjs/common';
import { User } from './user';

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

  findOne(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, user: User): User | undefined {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users[index] = user;
      return user;
    }
  }

  delete(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
