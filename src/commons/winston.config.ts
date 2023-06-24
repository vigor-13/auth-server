import * as NestWinston from 'nest-winston';
import * as Winston from 'winston';
import * as Moment from 'moment-timezone';
import 'winston-daily-rotate-file';

/**
 * WinstonJS Default Log Level
 *
 * 1. 📕 error: 가장 심각한 오류를 나타낸다. 애플리케이션에서 처리할 수 없는 예외 상황이 발생했을 경우 사용한다.
 * 2. 📙 warn: 경고 메시지를 나타낸다.
 * 3. 📗 info: 정보성 메시지를 나타낸다. 주로 애플리케이션의 진행 상황, 중요한 이벤트 또는 작업의 성공 여부 같은 정보를 기록하는데 사용된다.
 * 4. 🐛 verbose: 디버깅 목적으로 사용되는 상세한 정보를 나타낸다. 주로 개발 및 테스트 환경에서 사용되며 일반 운영 환경에서는 비활성화 하는 것이 일반적이다.
 * 5. 🐛 debug: 디버깅 목적으로 사용되는 정보를 나타낸다. 주로 개발 및 테스트 환경에서 사용되며 일반 운영 환경에서는 비활성화 하는 것이 일반적이다.
 * 6. 📚 silly: 매우 상세한 로깅 정보를 나타낸다. 일반적으로 가장 낮은 수준의 로그이며, 주로 개발 중에만 사용된다.
 *
 */
export const winstonLogger = NestWinston.WinstonModule.createLogger({
  transports: [
    new Winston.transports.Console({
      level: 'silly',
      format: Winston.format.combine(
        Winston.format.timestamp(),
        NestWinston.utilities.format.nestLike('Nest', {
          prettyPrint: true,
          colors: true,
        }),
      ),
    }),

    new Winston.transports.DailyRotateFile({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: __dirname + '../../logs',
      filename: `app.%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true,
      handleExceptions: true,
      json: false,
    }),
  ],

  format: Winston.format.combine(
    Winston.format((info) => {
      info.timestamp = Moment().tz('Asia/Seoul').format();
      return info;
    })(),
    Winston.format.json(),
    Winston.format.printf((info: Winston.Logform.TransformableInfo) => {
      return `${info.timestamp} - ${info.level} [${process.pid}]: ${info.message}`;
    }),
  ),
});
