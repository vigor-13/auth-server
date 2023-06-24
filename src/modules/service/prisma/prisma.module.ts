import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';

/**
 * @REF: https://github.com/prisma/prisma/issues/2443#issuecomment-630679118
 * @REF: https://stackoverflow.com/questions/71306315/how-to-pass-constructor-arguments-to-a-nestjs-provider
 */

@Module({
  providers: [
    {
      useFactory: (config: ConfigService) => {
        const prismaConfig = config.get('config').prisma;
        return new PrismaService(prismaConfig.database_url);
      },
      provide: PrismaService,
      inject: [ConfigService],
    },
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
