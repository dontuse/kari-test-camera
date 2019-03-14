import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Wix from './Wix';
import WixNoBtn from './WixNoBtn';
import ScanditCamera from './ScanditCamera';
import ScanditCameraNoBtn from './ScanditCameraNoBtn';
import { Container, Button, Icon, Text, Grid, Col } from 'native-base';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ marginBottom: 40, fontSize: 20 }}>
          <Button large success onPress={() => this.props.navigation.navigate('wix')}><Text>Wix camera</Text></Button>
        </View>
        <View>
          <Button large danger onPress={() => this.props.navigation.navigate('scandit')}><Text>Scandit camera</Text></Button>
        </View>
        <View style={{marginBottom: 20, marginTop: 50}}>
          <Text style={{fontSize: 30}}>Без кнопки</Text>
        </View>
        <View style={{ marginBottom: 40, fontSize: 20 }}>
          <Button large success onPress={() => this.props.navigation.navigate('wix-no-button')}><Text>Wix camera no button</Text></Button>
        </View>
        <View>
          <Button large danger onPress={() => this.props.navigation.navigate('scandit-no-button')}><Text>Scandit camera no button</Text></Button>
        </View>
      </View>
    );
  }
}

// class Scandit extends React.Component {
//   render() {
//     return (
//       <ScanditCamera />
//     );
//   }
// }

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    wix: Wix,
    scandit: ScanditCamera,
    'wix-no-button': WixNoBtn,
    'scandit-no-button': ScanditCameraNoBtn,
  },
  {
    initialRouteName: 'Home'
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
