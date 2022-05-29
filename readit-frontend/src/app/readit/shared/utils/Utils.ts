export class Utils{
  static getEnumKeyByValue(e: any, value: string): string {
    return Object.keys(e)[Object.values(e).indexOf(value)];
  }

  static padTo2Digits(num:number) {
    return num.toString().padStart(2, '0');
  }

  static formatDate(date:Date) {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('-');
  }
}
