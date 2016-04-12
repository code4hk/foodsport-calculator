import { Provider, connect } from 'react-redux';

const mapStateToProps = (state) => {
  let time = (state.calories *  1080 ) /4194;
  return {
    value: parseInt(time)
  }
}

const Time = (props) => (
  <span>
    {props.value}分鐘運動
    </span>
  )
  // placeholder="卡路里"
  const TimeToBurn = connect(
    mapStateToProps,
    null
  )(Time)

  export default TimeToBurn;
