import { Injectable } from '@nestjs/common';
import { type User } from '@art-nx/types';

const user: User = {
  id: '888141-asfaf-15fasd-551',
  name: 'John Doe',
  email: 'john.doe@gmail.com',
  age: 21,
};

@Injectable()
export class AppService {
  getData(): { message: string } {
    return {
      message: `Welcome to api! Really happy it works! ${user.name}<${user.email}>`,
    };
  }
}
