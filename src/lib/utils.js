export function randomNum(min, max, decimal = 0) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimal));
}

export function getType(data) {
  return Object.prototype.toString.call(data).slice(8, -1);
}

export function lastTime(time) {
  const oldMs = time * 1000;
  const currentMs = new Date().getTime();
  const IntervalMinute = (currentMs - oldMs) / 1000;
  const secondsTime = Math.floor(IntervalMinute);
  const minutesTime = Math.floor(IntervalMinute / 60);
  const hoursTime = Math.floor(IntervalMinute / 60 / 60);
  const daysTime = Math.floor(IntervalMinute / 60 / 60 / 24);
  const yearsTime = Math.floor(daysTime / 365);

  let result = '';
  if (IntervalMinute < 60) result = `${secondsTime} seconds`;
  if (IntervalMinute >= 60 && IntervalMinute < 3600)
    result = `${minutesTime} minutes`;
  if (IntervalMinute >= 3600 && IntervalMinute < 86400)
    result = `${hoursTime} hours`;
  if (daysTime >= 1 && daysTime < 365) result = `${daysTime} days`;
  if (daysTime >= 365) result = `${yearsTime} years`;

  return (
    <>
      {result}
      <span className="tail" style={{ marginLeft: '4px' }}>
        ago
      </span>
    </>
  );
}

export const txtSplit = (txt, ref) => {
  const text = txt;
  if (text.includes(ref)) {
    const textArr = text.split(ref);
    return (
      <>
        <span>{`${textArr[0]}${ref}`}</span> {`${textArr[1]}`}
      </>
    );
  } else {
    return txt;
  }
};

export const isDomain = (strUrl) => {
  const stringUrl = strUrl;
  const urlObj = new URL(stringUrl);
  return urlObj.host.includes('www.')
    ? urlObj.host.split('www.')[1]
    : urlObj.host;
};
