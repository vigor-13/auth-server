import { Module } from '@nestjs/common';
import { PrismaModule } from '@modules/prisma';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
