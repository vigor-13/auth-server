import {
  INestApplication,
  Injectable,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClientOptions } from '@prisma/client/runtime';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger: Logger;

  constructor(url: string) {
    const clientOption: PrismaClientOptions = {
      datasources: {
        db: { url },
      },
    };

    super(clientOption);

    this.logger = new Logger(PrismaService.name);
  }

  async onModuleInit() {
    await this.$connect().then(() => {
      this.logger.log('Database connection successfully completed');
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
