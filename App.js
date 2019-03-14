import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Wix from './Wix';
import WixNoBtn from './WixNoBtn';
import ScanditCamera from './ScanditCamera';
import ScanditCameraNoBtn from './ScanditCameraNoBtn';
import { Container, Button, Icon, Text, Grid, Col } from 'native-base';
import {
  ScanditModule,
} from 'scandit-react-native';


// Set your license key.
ScanditModule.setAppKey(
  'AfN8D1hKRVGpNTmJfxRiwrAlYOjPJs8EmGXlCghtIHa7fT+wgXbTocgia7R6d5Bcxnc8sepW6sNGAybofGIVnHZ+LFuXWhA3Wjfde6lx2FQ7YrSSpHbADYQuIVKKGso32yH7zFIP3ObpRx+Bzb4F15+AZXpRyLOeAz3TJLNnkrmXTr1lu6DmJnEc6wkXlP0juUyNouhSGCqFaguBdje0pYc3gUrs6Yw/1aGtOGctiDPZu2ct/+G4xSp3CL0zhNTiBRSqGCHM8GiMj8iai071XHCsZzcCV4+wLVhhu/IcYPH6tBi3P8ArfT/g+OfQymtzbFJYXzbS+a9/qocNG88vT49+LrGIO+d93TEbVGb3XARP5dU8wDjB+5fhL26Zw/skfsu38TayHlM/AaRhj6wYMl6cctoNW5gty+kMhezh5ycYlSRvGqF1YQowvLlC9Ns6AbhagTIsgfY398M3ZrdxTDjZvRGhnKTCO63N5Y36XLhnQRVrOrN/H7Izf8+4/nmpiycQypRtL8Hfp6kDxC7yxQ0cQ/2tsDgKhBgXkwj6n78SAqWPem/jE+Ar925O5kraEjhQfwWJLLRMzmpIEI1CAcqV4KStbCm/f2csykdHa+QEsmRHEsFGeSrYN3r6/s2gg/tNiDAi5aN/lxnIdOQpx+9qMJrxKtD5P14KIAYdmkipMHKqpHDvvgBN7kdjqqx4bEca6VoChIjY5ZF4HsL2lKRjIF+hvkwESqUbvD4NqsJFy4uGjALpOJX2jEk5Ph7TlEKY11DKULthk6hfs+A3cV6zv3KFMi8CQwGa/iOG9kM1w1LxUCQ='
);

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
