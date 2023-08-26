import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class AppModule {}
