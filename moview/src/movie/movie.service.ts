import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieService {
  getHello(): string {
    return '영화 테스트 입니다.';
  }
}
