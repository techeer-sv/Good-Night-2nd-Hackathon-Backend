import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewService {
  getHello(): string {
    return '리뷰 테스트 입니다.';
  }
}
