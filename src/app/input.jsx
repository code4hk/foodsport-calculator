import { Provider, connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    value: state.calories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateCalories: (calories) => {
      dispatch({
        type: Symbol.for('UPDATE_CALORIES'),
        calories
      })
    }
  }
}

const Input = (props) => (
  <span>
    <input type="number" defaultValue={0} value={props.value}
      onChange={(event)=>props.onUpdateCalories(event.target.valueAsNumber)}/ >卡路里
    </span>
  )
  // placeholder="卡路里"
  const CalorieInput = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Input)

  export default CalorieInput;
