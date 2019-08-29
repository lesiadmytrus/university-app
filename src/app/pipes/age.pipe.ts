import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {
  transform(value: string): number {
    const milisecondsInYear = 31557600000;
    const currentDay = Date.now();
    const birthday = Date.parse(value);
    const age = Math.floor((currentDay - birthday) / milisecondsInYear);

    return age;
  }
}
