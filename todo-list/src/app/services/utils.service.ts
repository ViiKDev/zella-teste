import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  dateOrig = new Date();
  date = {
    day: this.leadingZeros(2, this.dateOrig.getDate()),
    month: this.leadingZeros(2, this.dateOrig.getMonth() + 1),
    year: this.leadingZeros(2, this.dateOrig.getFullYear())
  }
  generateDate() {
    return `${this.date.year}-${this.date.month}-${this.date.day}`;
  }
  convertDate(date: string) {
    let newDate = date.split("-").reverse().join("/");
    if (newDate == date) {
      newDate = date.split("/").reverse().join("-");
    }
    return newDate;
  }
  leadingZeros(amount: number, value: number | string) {
    return value.toString().padStart(amount, "0");
  }
  deepCopy(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }

  constructor() { }
}
