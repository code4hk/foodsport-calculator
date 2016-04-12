import React , { PropTypes }  from 'react';
var ReactDOM = require('react-dom');


import { combineReducers, createStore } from 'redux';
import { Provider, connect } from 'react-redux';
// import loggingMiddleware from './loggingMiddleware';

import CalorieInput from './input';
import TimeToBurn from './time';
import PickableProfile from './profile';
import Food from './food';

import {PICK_PROFILE_SPORTY,PICK_PROFILE_OL,PICK_PROFILE_MIDDLEMAN,PICK_PROFILE_C9,UPDATE_CALORIES} from './actions';

//require('normalize.css')
require('lib/semantic/semantic.css');
require('lib/smoothscroll.js');
// require('lib/justfont.js');

require('src/spritesmith-generated/sprite.css');
require('src/spritesmith-generated/sprite.png');

require('src/app/index.css');
console.log("test");

//Using redux is overkill here, just to try out and learn

//TODO encap reducers
function calories(state = 0, action) {
  switch (action.type) {
    case PICK_PROFILE_SPORTY:
    return 3510;
    case PICK_PROFILE_OL:
    return 442;
    case PICK_PROFILE_MIDDLEMAN:
    return 1260;
    case PICK_PROFILE_C9:
    return 520;
    case UPDATE_CALORIES:
    return action.calories;
    default:
    //manual entry
    return state
  }
}

function currentFoodIndex(state=0,action){
  console.log(action);
  switch (action.type){
    case 'CREATE_FOOD_ACTION':
      return action.id
    default:
      return state
  }
}


let reducers = combineReducers({
  calories,
  currentFoodIndex
})
let store = createStore(reducers);

// TODO hardcoded length, shd load from food
let index = 0;
setInterval(()=>{
  index++;
  if(index >= 2){
    index = 0;
  }

  store.dispatch({ type: 'CREATE_FOOD_ACTION',id: index })
},1500)





function calculateTimeToBurn(){

}

//Rendering
ReactDOM.render(
  <Provider store={store}>
    <div className="ui four column stackable relaxed grid">
      <div className="column">
        <PickableProfile profileId={1} info={{
            title:"運動型壯男",
            avatarUrl:"img/avatar/sporty.png",
            activity: "行山6小時/星期",
            desc:"男 22歲 75kg",
            gender:"man"
          }}/>
        </div>
        <div className="ui vertical divider">或</div>
        <div className="column">
          <PickableProfile profileId={2} info={{
              title:"妙齡OL",
              avatarUrl:"img/avatar/ol.png",
              activity: "踏單車1小時/星期",
              desc:"女 25歲 65kg",
              gender:"woman"
            }}/>
          </div>
          <div className="ui vertical divider">或</div>
          <div className="column">
            <PickableProfile profileId={3} info={{
                title:"健康中佬",
                avatarUrl:"img/avatar/middleman.png",
                activity: "3次30分鐘慢跑 /星期",
                desc:"男 50歲 70kg",
                gender:"man"
              }}/>
            </div>
            <div className="ui vertical divider">或</div>
            <div className="column">
              <PickableProfile profileId={4} info={{
                  title:"青春常駐少婦",
                  avatarUrl:"img/avatar/c9.png",
                  activity: "游泳1小時/星期",
                  desc:"女 40歲 65kg",
                  gender:"woman"
                }}/>
              </div>
            </div>
          </Provider>,
          document.getElementById('profiles')
        );


ReactDOM.render(
  <Provider store={store}>
    <CalorieInput />
  </Provider>,
  document.getElementById('burnt')
);

ReactDOM.render(
  <Provider store={store}>
    <TimeToBurn />
  </Provider>,
  document.getElementById('time-to-burn')
);


ReactDOM.render(
  <Provider store={store}>
    <Food />
  </Provider>,
  document.getElementById('food-container')
);
