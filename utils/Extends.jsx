/* eslint-disable func-names */
Math.easeInOutQuad = function (currentTime, startValue, changes, duration) {
  // eslint-disable-next-line no-param-reassign
  currentTime /= duration * 0.5;
  if (currentTime < 1) return changes / 2 * currentTime * currentTime + startValue;
  // eslint-disable-next-line no-param-reassign
  currentTime -= 1;
  return -changes / 2 * (currentTime * (currentTime - 2) - 1) + startValue;
};

Element.prototype.remove = function () {
  this.parentNode.removeChild(this);
};

Element.prototype.animateScrolling = function (value, duration = 300) {
  const { scrollLeft } = this;
  const to = scrollLeft - value;
  const change = to - scrollLeft;
  let currentTime = 0;
  const increment = 10;
  const foo = () => {
    this.processing = true;
    currentTime += increment;
    const offset = Math.easeInOutQuad(currentTime, scrollLeft, change, duration);
    if (currentTime < duration) setTimeout(foo, increment);
    else this.processing = false;
    this.scrollLeft = offset;
    console.log(this.scrollLeft);
  };
  foo();
};
