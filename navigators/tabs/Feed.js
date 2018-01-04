import React from 'react'
import { StackNavigator } from 'react-navigation';
import Feed from '../../screens/Feed/Feed';
import Thread from '../../screens/Feed/Thread';
import NewPost from '../../screens/Feed/NewPost';
import AddToCircle from '../../screens/Feed/AddToCircle';
import ButtonLeft from '../../components/Navigation/Header/ButtonLeft';
import ButtonRight from '../../components/Navigation/Header/ButtonRight';
import NewPostButton from '../../components/Navigation/Header/NewPostButton';

const MainFeedOptions = {
  navigationOptions: ({ navigation }) => {
    const { navigate } = navigation;
    return {
      title: 'MyFeed',
      headerTitle: 'Feed', //can be String, React Element or React Componen
      //header: can be React Element or a function --> for customizing headers
      //TODO: Change drawer button from hamburger to profile picture (similar to Twitter)
      headerLeft: (
        <ButtonLeft
          icon="menu"
          navigate={navigate}
          to="DrawerOpen" />
      ),
    }
  }
}

// const modalOptions = {
//   headerMode: 'none',
//   mode: 'modal',
//   navigationOptions: ({ navigation }) => {
//     const { navigate } = navigation;
//     return {
//     }
//   }
// }


const MainFeedNavigator = StackNavigator({

    Feed:   { screen: Feed },
    Thread: { screen: Thread },
    AddToCircle: { screen: AddToCircle },
    NewPost: { screen: NewPost },

}, MainFeedOptions);

// const ModalFeedNavigator = StackNavigator({

//     MainFeedNavigator:   { screen: MainFeedNavigator },
//     NewPost: { screen: NewPost },

// }, modalOptions);

export default MainFeedNavigator;
