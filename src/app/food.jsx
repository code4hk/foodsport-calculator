import { Provider, connect } from 'react-redux';


let createFoodAction = (id)=> {
  type: 'CREATE_FOOD_ACTION',
  id
}

let foods= [{
  desc: '游泳一小時約可燃燒100千卡路里 = 1籠燒賣',
  url: 'img/dimsum.jpg'
},{
  desc: '游泳一小時約可燃燒100千卡路里 = 1隻熱狗',
  url: 'img/hotdog.jpg'
}
]

const mapStateToProps = (state) => {
  let url = foods[state.currentFoodIndex].url;
  let desc = foods[state.currentFoodIndex].desc;

  return {
    desc,
    url
  }
}

const CurrentFood = (props) => (
  <span>
    <h2>{props.desc}</h2>

  <img className="food" src={props.url}></img>
  </span>
)
// placeholder="卡路里"
const Food = connect(
  mapStateToProps,
  null
)(CurrentFood)

export default Food;
