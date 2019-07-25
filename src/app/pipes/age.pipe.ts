import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {
  transform(value: string) {
    const milisecondsInYear = 31557600000;
    const currentDay = Date.now();
    const birthDay = Date.parse(value);
    const age = Math.floor((currentDay - birthDay) / milisecondsInYear);

    return age;
  }
}
