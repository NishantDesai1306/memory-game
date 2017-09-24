import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'timer'})
export class TimerPipe implements PipeTransform {
  
  transform(value: number): String {
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;

    const minuteString = minutes < 10 ? `0${minutes}` : minutes;
    const secondString = seconds < 10 ? `0${seconds}` : seconds;

    return `${minuteString}:${secondString}`;
  }
}