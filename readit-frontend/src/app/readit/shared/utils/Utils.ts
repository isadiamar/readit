export class Utils{
  static getEnumKeyByValue(e: any, value: string): string {
    return Object.keys(e)[Object.values(e).indexOf(value)];
  }
}
