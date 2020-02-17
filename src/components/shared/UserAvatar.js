import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const UserAvatar = (props) => {
  const { user } = props;
  return (
    <Avatar src={user.picture} />
  );
};

export default UserAvatar;
