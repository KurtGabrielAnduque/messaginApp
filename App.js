import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, Image, TouchableHighlight, BackHandler } from 'react-native';
import React from 'react';
import MessageList from './components/MessageList';
import { createImageMessage, createLocationMessage, createTextMessage } from './utils/MessageUtils';
import Status from './components/StatusBar';
import Toolbar from './components/Toolbar';

export default class App extends React.Component {
  state = {
    messages:[
      createImageMessage('https://smapse.com/storage/2019/11/converted/660_464_y1.jpg'),
      createLocationMessage({
        latitude: 14.62592470816468,
        longitude: 121.06173789325429,
      }),
      createTextMessage('Look where am I Now'),
      createImageMessage('https://unsplash.it/300/300'),
      createTextMessage('Look where am I'),
      createTextMessage('Hi Kurt Anduque'),
      createLocationMessage({
        latitude: 37.78825,
        longitude: -122.4324,
      }),
    ],
    fullscreenImageId: null,
    isInputFocused: false,
  };


  componentWillMount() {
    this.subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      const { fullscreenImageId } = this.state;
      if (fullscreenImageId) {
        this.dismissFullscreenImage();
        return true; 
      }
      return false;
    });
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  dismissFullscreenImage = () => {
    this.setState({ fullscreenImageId: null });
  };


  handlePressMessage = ({ id, type }) => {
    switch (type) {
      case 'text':
        // This triggers the native phone pop-up window
        Alert.alert(
          'Delete message?',
          'Are you sure you want to permanently delete this message?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => {
                // If they hit delete, we remove that specific message from our state
                const { messages } = this.state;
                this.setState({
                  messages: messages.filter(message => message.id !== id),
                });
              },
            },
          ]
        );
        break;
      // add the case for image sizing
      case 'image':
        this.setState({ fullscreenImageId: id, isInputFocused: false });
        break;

      default:
        break;
    }
  };

  handlePressToolbarCamera = () => {
    // Placeholder for next lab!
  };

  handlePressToolbarLocation = () => {
    // Placeholder for next lab!
  };

  handleChangeFocus = (isFocused) => {
    this.setState({ isInputFocused: isFocused });
  };

  handleSubmit = (text) => {
    const { messages } = this.state;
    this.setState({
      // This creates a new message bubble and adds it to the top of the list!
      messages: [createTextMessage(text), ...messages], 
    });
  };

  renderMessageList(){
    const { messages } = this.state;

    return(
      <View style={styles.content}>
        <MessageList messages={messages} onPressMessage={this.handlePressMessage}/>
      </View>
    );
  }

  // Demonstration of Import Image and Touchable Highlight
  renderFullscreenImage = () => {
    const { messages, fullscreenImageId } = this.state;
    if (!fullscreenImageId) return null; // If no image is clicked, draw nothing

    // Find the specific image we clicked on
    const image = messages.find(message => message.id === fullscreenImageId);
    if (!image) return null;

    return (
      <TouchableHighlight style={styles.fullscreenOverlay} onPress={this.dismissFullscreenImage}>
        <Image style={styles.fullscreenImage} source={{ uri: image.uri }} resizeMode="contain" />
      </TouchableHighlight>
    );
  };

  renderToolbar() {
    const { isInputFocused } = this.state;
    return (
      <View style={styles.toolbar}>
        <Toolbar
          isFocused={isInputFocused}
          onSubmit={this.handleSubmit}
          onChangeFocus={this.handleChangeFocus}
          onPressCamera={this.handlePressToolbarCamera}
          onPressLocation={this.handlePressToolbarLocation}
        />
      </View>
    );
  }

  render () {
    return(
      <View style={styles.container}>
      <Status />

      
      {this.renderMessageList()}
      
      {this.renderToolbar()}
      
      <View style={styles.inputMethodEditor}>
        <Text>inputMethodEditor</Text>
      </View>
      {this.renderFullscreenImage()}
    </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth:2,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth:2,
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth:2,
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: 'white',
    borderWidth:2,
  },
  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 2,
  },
  fullscreenImage: {
    flex: 1,
    resizeMode: 'contain',
  },
});