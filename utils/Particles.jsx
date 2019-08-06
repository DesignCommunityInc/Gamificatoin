// Particles starts here ---
function randomValue(min, max) {
  return min + Math.random() * (max + 1 - min);
}

function randomInteger(minValue, maxValue) {
  const min = Math.ceil(minValue);
  const max = Math.floor(maxValue);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mapRange(value, from, to, from2, to2) {
  return (value - from) / (to - from) * (to2 - from2) + from2;
}

export default function ParticleSpawner(spawner, count, lifeTime, maxSpeed) {
  const time = lifeTime * 1000;
  const changingStatsInterval = 10;
  const defaultSize = 15;
  const eps = 10; // size coeff
  const array = [];

  setInterval(() => {
    if (array.length > count) return;
    const p = spawner.getBoundingClientRect();
    const parent = {
      height: p.height,
      top: p.top,
      right: p.right,
    };
    let mark = document.createElement('div');
    const spanContainer = document.createElement('div');
    let span1 = null;
    let span2 = null;
    switch (randomInteger(0, 4)) {
      case 0: case 4:
        span1 = document.createElement('span');
        span2 = document.createElement('span');
        spanContainer.append(span1);
        spanContainer.append(span2);
        spanContainer.className = 'cross';
        break;
      case 1:
        spanContainer.className = 'circle';
        break;
      case 2:
        spanContainer.className = 'square';
        break;
      case 3:
        spanContainer.className = 'triangle';
        break;
      default: break;
    }
    const w = defaultSize + Math.random() * eps;
    const l = parent.right - w;
    const t = parent.top + Math.random() * (parent.height - w);
    const xSpeed = randomValue(1, maxSpeed);
    const rSpeed = xSpeed;
    let ySpeed = randomValue(-5, 5) * maxSpeed * 0.05;
    while (ySpeed === 0) {
      ySpeed = randomValue(-5, 5) * maxSpeed * 0.05;
    }
    let opacityTimer = time;
    mark.className = 'mark';
    mark.style.width = `${w}px`;
    mark.style.height = `${w}px`;
    mark.style.top = `${t}px`;
    mark.style.left = `${l}px`;
    spanContainer.style.transform = 'rotate(0deg)';
    mark.append(spanContainer);
    array.push(mark);
    spawner.append(mark);
    const timer = setInterval(() => {
      const boundings = mark.getBoundingClientRect();
      mark.style.left = `${boundings.left + xSpeed}px`;
      mark.style.top = `${boundings.top + ySpeed}px`;
      mark.style.opacity = mapRange(opacityTimer, 0, time, 0, 1);
      const transform = spanContainer.style.transform.match(/\d+/g).map(Number)[0];
      spanContainer.style.transform = `rotate(${transform + rSpeed}deg)`;
      opacityTimer -= changingStatsInterval;
    }, changingStatsInterval);
    setTimeout(() => {
      mark.remove();
      array.splice(array.indexOf(mark), 1);
      mark = null;
      clearInterval(timer);
    }, time);
  }, time / count);
}
