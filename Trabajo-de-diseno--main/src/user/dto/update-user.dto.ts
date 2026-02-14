import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'Unique username for the user', required: false })
  username?: string;

  @ApiProperty({ description: 'User password', example: 'P@ssw0rd', required: false })
  password?: string;

  @ApiProperty({ description: 'Display name', required: false })
  name?: string;
}
