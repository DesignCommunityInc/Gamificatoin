
function GamingMouseEvents() { }

GamingMouseEvents.prototype = {
  constructor: GamingMouseEvents,
  getBoundingClientXY(e, target) {
    const { left, top } = target.getBoundingClientRect();
    return e.clientX ? {
      x: e.clientX - left,
      y: e.clientY - top,
    } : {
      x: e.offsetLeft - left,
      y: e.offsetTop - top,
    };
  },
  clearWindowSelections() {
    if (window.getSelection) {
      if (window.getSelection().empty) { // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) { // Firefox
        window.getSelection().removeAllRanges();
      }
    } else if (document.selection) { // IE?
      document.selection.empty();
    }
  },
  /**
   * move any DOMElement to mouse position (drag simulation)
   * @param {Class} e The class instance with x and y mouse coordinates
   * @param {DOMElement} target The movable element
   */
  move(e, target, boundings) {
    const { style } = target;
    if (e.touches) {
      const pageXOffset = document.documentElement.scrollLeft;
      const pageYOffset = document.documentElement.scrollTop;
      style.left = `${e.touches[0].clientX - target.offsetWidth * 0.5 + pageXOffset}px`;
      style.top = `${e.touches[0].clientY - target.offsetHeight * 0.5 + pageYOffset}px`;
      return false;
    }
    style.left = `${e.pageX - boundings.x}px`;
    style.top = `${e.pageY - boundings.y}px`;
    return false;
  },

  /**
   * is any element is dragging over a container
   *  @param {DOMElement} target The dragging element
   *  @param {DOMElement} element The mouseover element
   */
  elementMouseEnter(target, element) {
    //  target is in element if boundaries(x + y) > 0
    const boundaries = this.getBoundingClientXY(target, element);
    return (
      boundaries.x > -target.offsetWidth * 0.4
      && boundaries.y > -target.offsetHeight * 0.4
      && boundaries.y < element.offsetHeight - target.offsetHeight * 0.6
      && boundaries.x < element.offsetWidth - target.offsetWidth * 0.6
    );
  },
};

export default new GamingMouseEvents();
