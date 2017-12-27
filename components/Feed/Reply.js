import React from 'react';
import {
  View,
} from 'react-native';

import {
  post,
} from './styles';

import PostHeader from './Header/PostHeader';
import PostBody from './Body/PostBody';

const Reply = (props) => {

  const { body, createdAt } = props.post;
  const { name, avatar } = props.post.user;
  const onProfilePress = props.onProfilePress;

  return (
    <View style={ post.mainStyle }>

      <PostHeader
        userName={name}
        userAvatar={avatar}
        createdAt={createdAt}
        onProfilePress={onProfilePress}
      />

      <PostBody
        postBody={body}
      />

    </View>
  );
}

export default Reply;