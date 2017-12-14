import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, AsyncStorage, ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _values from 'lodash/values';
import * as actions from '../actions';
import Post from '../components/Feed/Post';
import ButtonBack from '../components/Navigation/Header/ButtonBack';

//import { testUser } from '../testData/testUser';
import { user, posts } from '../testData/testUser2';

//TODO: where do we initially get the uid?
//after authentication
//or Async.Storage if auth is persisted through sessions
const UID = '11111'

class FeedScreen extends Component {

  // const user = this.props.user;
  // const userName = this.props.user.name;
  // const userPicture = this.props.user.picture;
  // const userMessages = this.props.user.messages;
  // const messageDate = '';

  componentDidMount () {
    //setAndHandleFeedListener?
    this.props.fetchAndHandleUser(UID);
  }

  _fetchPosts = () => {

  }

  //TODO: Handle with redux actions:
  _handleLikes = () => {
    console.log("Liked");
  }

  _handleComments = (params) => {
    console.log("Commented");
    this.props.navigation.navigate('Thread', params);
  }

  _handleShares = () => {
    console.log("Shared");
  }

  _onProfilePress = (uid) => {
    console.log("Pressed profile")
    //this.props.navigation.navigate('UserProfile');

    //move to User Profile Screen:
    //this.props.fetchAndHandleUser(uid)
  }

  _keyExtractor = (item, index) => item.id;

  //TODO: Hook up to backend
  //TODO: handleComments.bind(this, post) --> postId instead of passing full post? send postId and retrieve again when called instead of passing around
  _renderPosts = ({ item }) => {
    const userInfo = this.props.user[UID].userInfo;

    //TODO: think about using {...this.props} to pass props down to 'Post'

    return (
      <Post
        key={item.id}
        post={item}
        user={item.user}
        handleLikes={this._handleLikes}
        handleComments={this._handleComments.bind(this, { post: item })}
        handleShares={this._handleShares}
        onProfilePress={this._onProfilePress}
      />
    )
  }

  render() {
    // if (!this.state.mapLoaded) {
    //   return (
    //     <View style={{ flex: 1, justifyContent: 'center' }}>
    //       <ActivityIndicator size="large" />
    //     </View>
    //   );
    // }

    //TODO: research and include flatlist features,
    //e.g. pull to refresh, scroll loading, etc.
    //https://facebook.github.io/react-native/docs/flatlist.html
    if (this.props.user.isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <FlatList
        keyExtractor={this._keyExtractor}
        data={ _values(posts) }
        renderItem={ this._renderPosts }
      />
    );
  }
}

//TODO: set up backend and connect to redux
function mapStateToProps({ user, posts }) {
  return {
    user,
    posts
  }
}

export default connect(mapStateToProps, actions)(FeedScreen);
