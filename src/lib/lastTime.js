/**
 * @param {*} oldTime : Unix time
 */

function lastTime(time) {
  console.log('ttt');
  const oldMs = time * 1000;
  const currentMs = new Date().getTime();
  const IntervalMinute = (currentMs - oldMs) / 1000;
  let result = '';
  if (IntervalMinute < 60) result = `${Math.floor(IntervalMinute)} seconds ago`;
  if (IntervalMinute >= 60 && IntervalMinute < 3600)
    result = `${Math.floor(IntervalMinute / 60)} minutes ago`;
  if (IntervalMinute >= 3600 && IntervalMinute < 86400)
    result = `${Math.floor(IntervalMinute / 60 / 60)} hours ago`;
  if (IntervalMinute >= 86400)
    result = `${Math.floor(IntervalMinute / 60 / 60 / 24)} days ago`;
  return result;
}

export default lastTime;
