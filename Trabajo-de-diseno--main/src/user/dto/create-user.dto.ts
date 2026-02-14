import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Unique username for the user' })
  username: string;

  @ApiProperty({ description: 'User password', example: 'P@ssw0rd' })
  password: string;

  @ApiProperty({ description: 'Display name', required: false })
  name?: string;
}
