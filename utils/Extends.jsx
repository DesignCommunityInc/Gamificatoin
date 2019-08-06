/* eslint-disable func-names */

// return this.split(search).join(replace);

Math.easeInOutQuad = function (currentTime, startValue, changes, duration) {
  let time = currentTime / duration * 0.5;
  if (time < 1) return changes / 2 * time * time + startValue;
  time += 1;
  return -changes / 2 * (time * (time - 2) - 1) + startValue;
};

Element.prototype.remove = function () {
  this.parentNode.removeChild(this);
};

Element.prototype.animateScrolling = function (value, duration = 300) {
  const { scrollLeft } = this;
  const to = scrollLeft - value;
  const change = to - scrollLeft;
  let currentTime = 0;
  const increment = 20;
  const foo = () => {
    this.processing = true;
    currentTime += increment;
    const offset = Math.easeInOutQuad(currentTime, scrollLeft, change, duration);
    if (currentTime < duration) setTimeout(foo, increment);
    else this.processing = false;
    this.scrollLeft = offset;
  };
  foo();
};
