import { LogHandler } from './log-handler.interface';

// logger-config.interface.ts
export interface LoggerConfig {
  flushInterval?: number; // in milliseconds
  handlers?: LogHandler[]; // Array of handlers
}
