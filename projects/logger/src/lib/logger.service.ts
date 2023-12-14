import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { LogEntry } from './interfaces/log-entry.interface';
import { LogHandler } from './interfaces/log-handler.interface';
import { LoggerConfig } from './interfaces/logger-config.interface';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private logQueue = new BehaviorSubject<LogEntry[]>([]);
  private flushInterval: number = 5000; // default value
  private handlers: LogHandler[] = [];

  constructor() {
    // set up an interval to periodically save logs
    interval(this.flushInterval).subscribe(() => {
      this.flushLogs();
    });
  }

  // Method to set configuration
  configure(config: LoggerConfig): void {
    if (config.flushInterval) {
      this.flushInterval = config.flushInterval;
      // Reset the interval here if needed
    }
    if (config.handlers && config.handlers.length) {
      this.handlers = config.handlers;
    }
  }

  // adds a new log entry
  log(message: string): void {
    const logEntry: LogEntry = { message, timestamp: new Date() };
    this.logQueue.next([...this.logQueue.value, logEntry]);
  }

  // saves logs using all handlers
  private flushLogs(): void {
    const logs = this.logQueue.value;
    if (logs.length === 0) return;

    this.handlers.forEach((handler) => handler.handle(logs));
    this.logQueue.next([]);
  }
}
