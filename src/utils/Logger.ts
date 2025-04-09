"use strict";

import { DateTime } from 'luxon';

export class Logger {
  private methodName: string;
  private debugMode: boolean;
  private timeZone: string;

  constructor (methodName: string, timeZone?: string) {
    this.methodName = methodName;
    this.debugMode = (process.env.DEBUG_MODE?.toLowerCase() === 'true');
    this.timeZone = timeZone ?? 'America/Mexico_City';
  };

  private formatedPrint (data: unknown, timestamp: string, logType?: string): void {
    const formatted =
      typeof data === 'object'
        ? JSON.stringify (data, null, 2)
        : `${data}`;
    const baseString: string = `[${timestamp}][${this.methodName}]${logType == undefined ? '' : `[${logType == 'WARN' ? 'DEBUG' : logType}]`}`;
    
    const printFoo = (logType: string) => {
      return logType == 'LOG' ? console.log :
        logType == 'WARN' ? console.warn :
          logType == 'ERROR' ? console.error :
            logType == 'DEBUG' ? console.debug : console.log;
    }

    printFoo (logType ?? 'LOG')(`${baseString} --> ${formatted}`);
  }

  public log (data: unknown): void {
    const timestamp: string = DateTime.now ()
      .setZone(this.timeZone)
      .toFormat("yyyy-MM-dd HH:mm:ss");

    this.formatedPrint (data, timestamp, 'LOG');
  }

  public error (data: unknown): void {
    const timestamp: string = DateTime.now ()
      .setZone(this.timeZone)
      .toFormat("yyyy-MM-dd HH:mm:ss");

    this.formatedPrint (data, timestamp, 'ERROR');
  } 

  public debug (data: unknown): void {
    const timestamp: string = DateTime.now ()
      .setZone(this.timeZone)
      .toFormat("yyyy-MM-dd HH:mm:ss");
    if (this.debugMode) {
        this.formatedPrint (data, timestamp, 'WARN');
    }
  } 

  public getTime (): String {
    const timestamp: string = DateTime.now ()
      .setZone(this.timeZone)
      .toFormat("yyyy-MM-dd HH:mm");
    return timestamp;
  }
};