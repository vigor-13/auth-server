import { Module } from '@nestjs/common';
import { RouterModule } from '@modules/router';
import { ServiceModule } from '@modules/service';
import { CoreModule } from '@modules/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CoreModule, ServiceModule, RouterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
