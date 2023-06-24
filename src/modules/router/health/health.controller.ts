import { Public } from '@commons';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @ApiOperation({
    description: 'Http health check API.',
  })
  @Public()
  @Get('http')
  @HealthCheck()
  httpCheck() {
    return this.health.check([
      () => this.http.pingCheck('local-server', 'http://localhost:8080'),
    ]);
  }
}
