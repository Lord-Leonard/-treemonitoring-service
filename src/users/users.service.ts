import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      username: 'john',
      password_hash: '$2a$10$LayqW9ZU5WAxAy36k.DJhORX.4gSJYGgSIrRdz4RK2ISfHyvnQCV.',
    },
    {
      id: 2,
      username: 'maria',
      password_hash: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}