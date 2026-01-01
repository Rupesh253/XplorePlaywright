import * as winston from 'winston';
const { combine, timestamp, printf, colorize, align } = winston.format;
import * as CONSTANTS from '../test_auxiliaries/constants';
const LOGS_DIRECTORY = CONSTANTS.LOGS_DIRECTORY;
export const logger = winston.createLogger({
  exitOnError: false,
  level: process.env.LOG_LEVEL || 'info',
  defaultMeta: { service: 'YOUR_PROJECT' },
  format: combine(
    timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSSA' }),
    align(),
    printf((info) => `${info.timestamp} [${info.service}] ${info.level.toUpperCase()} ${info.message}`),
  ),
  transports: [
    new winston.transports.Console({ format: colorize({ all: true }) }),
    new winston.transports.File({
      filename: LOGS_DIRECTORY + 'execution.log',
      level: 'info',
      maxsize: 20480,
      maxFiles: 15,
    }),
    new winston.transports.File({
      filename: LOGS_DIRECTORY + 'errors.log',
      level: 'error',
      maxsize: 10240,
      maxFiles: 15,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.Console({ format: colorize({ all: true }) }),
    new winston.transports.File({
      filename: LOGS_DIRECTORY + 'exceptions.log',
      maxsize: 10240,
      maxFiles: 15,
    }),
  ],
  rejectionHandlers: [
    new winston.transports.Console({ format: colorize({ all: true }) }),
    new winston.transports.File({
      filename: LOGS_DIRECTORY + 'rejections.log',
      maxsize: 10240,
      maxFiles: 15,
    }),
  ],
});
