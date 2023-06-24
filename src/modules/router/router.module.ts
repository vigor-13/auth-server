import { Module } from '@nestjs/common';
import { HealthModule } from './health';
import { AuthModule } from './auth';
import { UserModule } from './user';

@Module({
  imports: [HealthModule, AuthModule, UserModule],
})
export class RouterModule {}
