Element.prototype.remove = function() { 
  this.parentNode.removeChild(this); 
}
String.prototype.replaceAll = function(search, replace) { 
  return this.split(search).join(replace); 
}
Math.easeInOutQuad = function(currentTime, startValue, changesInValue, duration) {
    currentTime /= duration / 2;
    if (currentTime < 1) 
      return changesInValue / 2 * currentTime * currentTime + startValue;
    currentTime--;
    return - changesInValue / 2 * ( currentTime * ( currentTime - 2 ) - 1) + startValue;
};
Element.prototype.animateScrolling = function(value, duration = 300) { 
  let start = this.scrollLeft;
  let to = start - value;
  let change = to - start;
  let currentTime = 0;
  let increment = 20;
  let foo = () => {
    this.processing = true;
    currentTime += increment;
    let offset = Math.easeInOutQuad(currentTime, start, change, duration);
    if(currentTime < duration) 
      setTimeout(foo, increment);
    else this.processing = false;
    this.scrollLeft = offset;
  }
  foo();
}