import UtcDate from './UtcDate';


// Override original Date object
window.Date = UtcDate;


// Fix some date type checks
const originalObjectToString = window.Object.prototype.toString;

window.Object.prototype.toString = function() {
  if (this instanceof UtcDate || this?.prototype === UtcDate.prototype) {
      return '[object Date]';
  }

  return originalObjectToString.apply(this, arguments);
}
