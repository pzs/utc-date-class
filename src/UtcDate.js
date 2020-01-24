import { weekDayNames, monthNames, pad, isTimezoneOffsetPresent, getTimezoneOffset } from './util';


export default class UtcDate extends Date {

  /**
   * Parse date time string. If timezone is not present, then it will be treated as UTC time
   */
  static parse(dateString) {
    if (isTimezoneOffsetPresent(dateString)) {
      return UtcDate.OriginalDate.parse(dateString);
    }

    // Add 'Z' params, if timezone is not present and parse it with original parse method
    return UtcDate.OriginalDate.parse(dateString + 'Z');
  }

  static OriginalDate = Date;


  /**
   * Date construtor:
   * - 1. No parameters: current time, but it will be in UTC
   * - 2. Time value or timestamp number: no conversion needed
   * - 3. Timestamp string: see UtcDate.parse method
   * - 4. Individual date and time component values: treated as UTC date and time
   */
  constructor(...args) {
    super();

    if (args.length === 0) {
      // nothing to convert

    } else if (args.length === 1 && typeof args[0] === 'number') {
      this.setTime(args[0]);
      this.timezoneOffset = 0;

    } else if (args.length === 1 && typeof args[0] === 'string') {
      this.setTime(UtcDate.parse(args[0]));
      this.timezoneOffset = getTimezoneOffset(args[0]);

    } else if (args.length === 1 && args[0]?.getTime) {
      this.setTime(args[0].getTime());

      if (args[0].timezoneOffset !== undefined) {
        this.timezoneOffset = args[0].timezoneOffset;
      }

    } else if (args.length > 1) {
      this.setUTCFullYear(args[0] ?? 0, args[1] ?? 0, args[2] ?? 0);
      this.setUTCHours(args[3] ?? 0, args[4] ?? 0, args[5] ?? 0, args[6] ?? 0);
      this.timezoneOffset = 0;

    } else {
      console.error('[UtcDate] Wrong params: ', ...args);
    }
  }

  /**
   * Date always in UTC
   */
  getTimezoneOffset() {
    return 0;
  }

  /**
   * Returns the original timezone offset between:
   * - your local time zone and UTC, if you created a new Date() without any parameter,
   * - the time zone and UTC, if you created a new Date() with a datetime string where the timezone was present,
   * or zero in any other case.
   */
  getOriginalTimezoneOffset() {
    return this.timezoneOffset ?? super.getTimezoneOffset();
  }

  getDate() {
    return this.getUTCDate();
  }

  getDay() {
    return this.getUTCDay();
  }

  getFullYear() {
    return this.getUTCFullYear();
  }

  getHours() {
    return this.getUTCHours();
  }

  getMilliseconds() {
    return this.getUTCMilliseconds();
  }

  getMinutes() {
    return this.getUTCMinutes();
  }

  getMonth() {
    return this.getUTCMonth();
  }

  getSeconds() {
    return this.getUTCSeconds();
  }

  getYear() {
    return this.getFullYear() - 1900;
  }

  setDate(...args) {
    this.setUTCDate(...args);
  }

  setFullYear(...args) {
    this.setUTCFullYear(...args);
  }

  setHours(...args) {
    this.setUTCHours(...args);
  }

  setMilliseconds(...args) {
    this.setUTCMilliseconds(...args);
  }

  setMinutes(...args) {
    this.setUTCMinutes(...args);
  }

  setMonth(...args) {
    this.setUTCMonth(...args);
  }

  setSeconds(...args) {
    this.setUTCSeconds(...args);
  }

  setYear(year) {
    this.setFullYear(year + 1900);
  }

  toDateString() {
    return `${weekDayNames[this.getDay()]} ${monthNames[this.getMonth()]} ${pad(this.getDate())} ${this.getFullYear()}`;
  }

  toTimeString() {
    return `${pad(this.getHours())}:${pad(this.getMinutes())}:${pad(this.getSeconds())} GMT`;
  }

  toString() {
    return `${this.toDateString()} ${this.toTimeString()}`;
  }

  toGMTString() {
    console.warn('[UtcDate] toGMTString is deprecated, returns toISOString()');
    return this.toISOString();
  }

  toISOString() {
    const date = `${this.getUTCFullYear()}-${pad(this.getUTCMonth() + 1)}-${pad(this.getUTCDate())}`;
    const time = `${pad(this.getUTCHours())}:${pad(this.getUTCMinutes())}:${pad(this.getUTCSeconds())}.${(this.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5)}`;

    return `${date}T${time}Z`;
  };

  toJSON() {
    return this.toISOString();
  }

  toLocaleDateString() {
    console.warn('[UtcDate] toLocaleDateString is not implemented');
    return super.toLocaleDateString.apply(this, arguments);
  }

  toLocaleFormat() {
    console.warn('[UtcDate] toLocaleDateString is not implemented');
    return super.toLocaleDateString.apply(this, arguments);
  }

  toLocaleString() {
    console.warn('[UtcDate] toLocaleDateString is not implemented');
    return super.toLocaleDateString.apply(this, arguments);
  }

  toLocaleTimeString() {
    console.warn('[UtcDate] toLocaleDateString is not implemented');
    return super.toLocaleDateString.apply(this, arguments);
  }

}
