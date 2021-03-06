import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import _values from 'lodash/values';
import { isEmpty } from 'lodash';
import * as actions from '../../actions';
import { ButtonBack, NewPostButton } from '../../components';

import { FlatList, RectButton } from 'react-native-gesture-handler';
import AppleStyleSwipeableRow from './AppleStyleSwipeableRow';

import { user } from '../../testData/testUser2';

const Row = ({ item, navigation, navParams }) => {
  //passing in circle name or id params
  return (
    <RectButton style={styles.rectButton} onPress={() => navigation.navigate('Feed', navParams)}>
      <Text style={styles.fromText}>{item.name}</Text>
      <Text numberOfLines={2} style={styles.messageText}>
        {item.description}
      </Text>
      <Text style={styles.dateText}>
        {item.lastUpdated} {'❭'}
      </Text>
    </RectButton>
  );
}

const SwipeableRow = ({ item, index, navigation, navParams }) => {
    return (
      <AppleStyleSwipeableRow>
        <Row
          item={item}
          navigation={navigation}
          navParams={navParams} />
      </AppleStyleSwipeableRow>
    );
};

class MyCirclesScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    const { navigate, goBack } = navigation;

    return {
      title: 'MyCircles',
      headerTitle: 'MyCircles',
      headerRight: (
        <NewPostButton
          color="red"
          navigate={navigate}
          to="HealthGoals" />
      ),
    }
  }

  componentDidMount () {
    this.props.fetchAndHandleUserCircles(this.props.user.userInfo.uid);
  }

  render() {
    const { navigation } = this.props;
    const { circles } = this.props.myCircles
    const isFetchingCircles = this.props.myCircles.isFetchingCircles;

    if (isFetchingCircles) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (isEmpty(circles)) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center' }}> {'No circles yet'} </Text>
        </View>
      )
    }

    return (
      <FlatList
        data={circles}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item, index }) => (
          <SwipeableRow
            item={item}
            index={index}
            navigation={navigation}
            navParams={item.circleId} />
        )}
        keyExtractor={(item, index) => index}
      />
    );
  }
}

function mapStateToProps({ user, myCircles }) {
  return {
    user,
    myCircles,
  }
}

export default connect(mapStateToProps, actions)(MyCirclesScreen);

const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  messageText: {
    color: '#999',
    backgroundColor: 'transparent',
  },
  dateText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 10,
    color: '#999',
    fontWeight: 'bold',
  },
});

const DATA = [
  {
    circleId: 1,
    name: "Managing my Diabetes",
    lastUpdated: '3:11 PM',
    message:
      'Unus pro omnibus, omnes pro uno. Nunc scelerisque, massa non lacinia porta, quam odio dapibus enim, nec tincidunt dolor leo non neque',
  },
  {
    circleId: 2,
    name: 'Fitness',
    lastUpdated: '11:46 AM',
    message:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus hendrerit ligula dignissim maximus aliquet. Integer tincidunt, tortor at finibus molestie, ex tellus laoreet libero, lobortis consectetur nisl diam viverra justo.',
  },
  {
    circleId: 3,
    name: 'Paleo Diet',
    lastUpdated: '6:06 AM',
    message:
      'Sed non arcu ullamcorper, eleifend velit eu, tristique metus. Duis id sapien eu orci varius malesuada et ac ipsum. Ut a magna vel urna tristique sagittis et dapibus augue. Vivamus non mauris a turpis auctor sagittis vitae vel ex. Curabitur accumsan quis mauris quis venenatis.',
  },
  {
    circleId: 4,
    name: 'Sleep',
    lastUpdated: 'Yesterday',
    message:
      'Vivamus id condimentum lorem. Duis semper euismod luctus. Morbi maximus urna ut mi tempus fermentum. Nam eget dui sed ligula rutrum venenatis.',
  },
];

// class MyCirclesScreen extends Component {

//   static navigationOptions = ({ navigation }) => {
//     const { navigate, goBack } = navigation;

//     return {
//       title: 'MyCircles',
//       headerTitle: 'MyCircles',
//       headerRight: (
//         <NewPostButton
//           color="red"
//           navigate={navigate}
//           to="Feed" />
//       ),
//     }
//   }

//   componentDidMount () {
//     //setAndHandleFeedListener?
//     //move to authentication:
//     //this.props.fetchAndHandleUser(UID);
//     //this.props.fetchAndHandleCircles(this.props.user.userInfo.uid);
//   }

//   render() {

//     // if (isFetching) {
//     //   return (
//     //     <View style={{ flex: 1, justifyContent: 'center' }}>
//     //       <ActivityIndicator size="large" />
//     //     </View>
//     //   );
//     // }

//     return (
//       <View>

//         <Text>{'Hi'}</Text>

//       </View>
//     );
//   }
// }

// function mapStateToProps({ user }) {
//   return {
//     user,
//   }
// }

// export default connect(mapStateToProps, actions)(MyCirclesScreen);
