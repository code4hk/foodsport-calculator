import { Provider, connect } from 'react-redux';
import React , { PropTypes }  from 'react';
import {PICK_PROFILE_SPORTY,PICK_PROFILE_OL,PICK_PROFILE_MIDDLEMAN,PICK_PROFILE_C9} from './actions.js'

//redunant
function pickProfile(id) {
  switch (id) {
    case 1:
    return {
      type: PICK_PROFILE_SPORTY,
      id
    }
    case 2:
    return {
      type: PICK_PROFILE_OL,
      id
    }
    case 3:
    return {
      type: PICK_PROFILE_MIDDLEMAN,
      id
    }
    case 4:
    return {
      type: PICK_PROFILE_C9,
      id
    }
    default:
    return
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onProfileClick: (id) => {
      dispatch(pickProfile(id))
    }
  }
}


const ProfileInfo = ({title,activity,desc,gender,avatarUrl}) => (
  <div  className="ui centered card profile-card" >
    <div className="image">
      <img className="profile-avatar" src={avatarUrl}></img>
    </div>
    <div className="content">
      <div className="header">{title}</div>
      <div className="meta">
        <span className="category">{activity}</span>
      </div>
    </div>
    <div className="extra content">
      <div className="right floated author">
        <i className={gender+' icon'}></i>{desc}
        </div>
      </div>
    </div>
  )

  ProfileInfo.propTypes = {
    title: PropTypes.string.isRequired
  }
  const Profile = ({ profileId,onProfileClick,info }) => (
    <div onClick={() => onProfileClick(profileId)}>
      <a href="javascript:void(0);">
        <ProfileInfo title={info.title} activity={info.activity} desc={info.desc} gender={info.gender} avatarUrl={info.avatarUrl}/>
      </a>
    </div>
  )

  const PickableProfile = connect(
    null,
    mapDispatchToProps
  )(Profile)

  Profile.propTypes = {
    profileId: PropTypes.number.isRequired,
    onProfileClick: PropTypes.func.isRequired,
    info: PropTypes.object.isRequired
  }

  export default PickableProfile;
