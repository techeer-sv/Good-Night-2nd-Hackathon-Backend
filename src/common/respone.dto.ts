import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseDto<T> {
  @Expose()
  code: number;
  @Expose()
  message: string;
  @Expose()
  data: T;
}

@Exclude()
export class ResponseWithoutDataDto {
  @Expose()
  code: number;
  @Expose()
  message: string;
}
