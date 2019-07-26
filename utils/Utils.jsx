
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
            let val = Math.easeInOutQuad(currentTime, start, change, duration);
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

export default new Utils();
