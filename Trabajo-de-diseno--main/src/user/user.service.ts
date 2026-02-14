import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }

  create(user: Partial<User>) {
    const id = user.id ?? this.generateId();
    const newUser: User = {
      id,
      username: user.username,
      password: user.password,
      name: user.name,
    } as User;
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) return null;
    return user;
  }

  update(id: string, user: Partial<User>) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    const updated = { ...this.users[index], ...user, id } as User;
    this.users[index] = updated;
    return updated;
  }

  remove(id: string) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException('User not found');
    const [removed] = this.users.splice(index, 1);
    return removed;
  }
}