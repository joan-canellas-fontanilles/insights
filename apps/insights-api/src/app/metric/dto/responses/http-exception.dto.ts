import { ApiProperty } from '@nestjs/swagger';

export class HttpExceptionDto {
  @ApiProperty({
    description: 'Message indicating the issue with the request',
  })
  public response: string;

  @ApiProperty({
    description: 'Http status code for the error',
  })
  public status: number;
}
