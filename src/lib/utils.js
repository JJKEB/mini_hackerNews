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
  let result = '';
  console.log(IntervalMinute);
  if (IntervalMinute < 60) result = `${Math.floor(IntervalMinute)} seconds ago`;
  if (IntervalMinute >= 60 && IntervalMinute < 3600)
    result = `${Math.floor(IntervalMinute / 60)} minutes ago`;
  if (IntervalMinute >= 3600 && IntervalMinute < 86400)
    result = `${Math.floor(IntervalMinute / 60 / 60)} hours ago`;
  if (IntervalMinute >= 86400)
    result = `${Math.floor(IntervalMinute / 60 / 60 / 24)} days ago`;
  return result;
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
