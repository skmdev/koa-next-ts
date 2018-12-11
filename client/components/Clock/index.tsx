import { formatTime } from '../../../common/utils';

export default (props) => {
  return (
    <div className={props.light ? 'light' : ''}>
      {formatTime(new Date(props.lastUpdate))}
    </div>
  );
};
