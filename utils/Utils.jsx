
function Utils() { }

Utils.prototype = {
    constructor: Utils,
    isElementInView: (element, container, fullyInView) => {
        let pageTop = container.scrollTop;
        let pageBottom = pageTop + container.offsetHeight;
        let elementTop = element.offsetTop;
        let elementBottom = elementTop + element.offsetHeight;
        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop < pageBottom) && (elementBottom > pageTop));
        }
    },
    scrollTo(element, to, duration) {
      let start = element.scrollTop,
          change = to - start,
          currentTime = 0,
          increment = 20,
          animateScroll = () => {
            currentTime += increment;
            let val = easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if(currentTime < duration) {
              setTimeout(animateScroll, increment);
            }
          };
      animateScroll();
    },
    forward(container, value) {
      let processing = container.processing || false;
      if(!processing)
        container.animateScrolling(value);
    },
    backward(container, value) {
      let processing = container.processing || false;
      if(!processing)
        container.animateScrolling(value);
    },
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
      let offset = easeInOutQuad(currentTime, start, change, duration);
      if(currentTime < duration) 
        setTimeout(foo, increment);
      else this.processing = false;
      this.scrollLeft = offset;
    }
    foo();
}
const easeInOutQuad = (
  currentTime, 
  startValue, 
  changesInValue, 
  duration
  ) => {
    currentTime /= duration / 2;
    if (currentTime < 1) 
      return changesInValue / 2 * currentTime * currentTime + startValue;
    currentTime--;
    return - changesInValue / 2 * ( currentTime * ( currentTime - 2 ) - 1) + startValue;
};

export default new Utils();
