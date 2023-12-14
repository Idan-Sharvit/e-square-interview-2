import { LogEntry } from './log-entry.interface';

export interface LogHandler {
  handle(logs: LogEntry[]): void;
}
