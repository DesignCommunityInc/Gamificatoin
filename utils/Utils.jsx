
function Utils() { }

Utils.prototype = {
  constructor: Utils,
  mapRange: (value, from, to, from2, to2) => (value - from) / (to - from) * (to2 - from2) + from2,
  isElementInView: (element, container, fullyInView) => {
    const pageTop = container.scrollTop;
    const pageBottom = pageTop + container.offsetHeight;
    const elementTop = element.offsetTop;
    const elementBottom = elementTop + element.offsetHeight;
    if (fullyInView === true) return ((pageTop < elementTop) && (pageBottom > elementBottom));
    return ((elementTop < pageBottom) && (elementBottom > pageTop));
  },
  scrollTo(element, to, duration) {
    let { scrollTop } = element;
    const start = scrollTop;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;
    const animateScroll = () => {
      currentTime += increment;
      const val = Math.easeInOutQuad(currentTime, start, change, duration);
      scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  },
  forward(container, value) {
    const processing = container.processing || false;
    if (!processing) container.animateScrolling(value);
  },
  backward(container, value) {
    const processing = container.processing || false;
    if (!processing) container.animateScrolling(value);
  },
};

export default new Utils();
