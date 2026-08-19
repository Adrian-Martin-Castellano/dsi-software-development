/**
 * Date class. Represents a date.
 */
export class Date {
  /**
   * Date constructor
   * @param _day - Day
   * @param _month - Month
   * @param _year - Year
   */
  constructor(
    private readonly _day: number,
    private readonly _month: number,
    private readonly _year: number
  ) {
    const isLeapYear = (_year % 4 === 0 && _year % 100 !== 0) || (_year % 400 === 0);

    if (
      _day < 1 ||
      _month < 1 ||
      _month > 12 ||
      _year < 1 ||
      (_month === 2 && ((isLeapYear && _day > 29) || (!isLeapYear && _day > 28))) ||
      ((_month === 4 || _month === 6 || _month === 9 || _month === 11) && _day > 30) ||
      _day > 31
    ) {
      throw new Error("Invalid date format.");
    }
  }

  /**
   * Day getter
   */
  get day() {
    return this._day;
  }

  /**
   * Month getter
   */
  get month() {
    return this._month;
  }

  /**
   * Year getter
   */
  get year() {
    return this._year;
  }

  /**
   * Creates a string representing a date in DD/MM/YYYY format
   * @returns String formatted as DD/MM/YYYY
   */
  getDate(): string {
    return `${this._day}/${this._month}/${this._year}`;
  }

  /**
   * Compares if the date is less than or equal to another date
   * @param date2 - Date to compare against
   * @returns True if less than or equal to the given date, false otherwise
   */
  isLowerOrEqualThan(date2: Date): boolean {
    return (
      this._year < date2.year ||
      (this.year === date2.year &&
        (this._month < date2.month ||
          (this.month === date2.month && this.day <= date2.day)))
    );
  }
}