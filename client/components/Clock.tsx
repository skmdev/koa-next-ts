export default (props) => {
  return (
    <div className={props.light ? 'light' : ''}>
      {format(new Date(props.lastUpdate))}
    </div>
  );
};

const format = (t) =>
  `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(t.getUTCSeconds())}`;

const pad = (n) => (n < 10 ? `0${n}` : n);
