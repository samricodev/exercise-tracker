import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  constructor(name: string, phone: string) {
    this.name = name;
    this.phone = phone;
  }

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;
}
