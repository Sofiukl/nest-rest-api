import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { IdeaModule } from './idea/idea.module';

@Module({
  imports: [UserModule, IdeaModule],
  providers: [],
  exports: [UserModule, IdeaModule],
})
export class ApiModule {}