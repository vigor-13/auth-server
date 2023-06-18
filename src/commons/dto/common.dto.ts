import { ApiProperty } from '@nestjs/swagger';

export class ResponseBodyStatusDto {
  @ApiProperty()
  isSuccess: boolean;

  @ApiProperty()
  code: number;

  @ApiProperty()
  message: string | null;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  path: string;
}

export class ResponseBodyWithoutDataDto {
  @ApiProperty()
  status: ResponseBodyStatusDto;
}

export abstract class ResponseBody<T> {
  status: ResponseBodyStatusDto;
  data: T;
}
