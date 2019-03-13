import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Wix from './Wix';
import ScanditCamera from './ScanditCamera';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <View style={{marginBottom: 20, fontSize: 20}}>
        <Button
          title="Wix"
          onPress={() => this.props.navigation.navigate('wix')}
          
        />
        </View>
       
        <Button
          title="Scandit"
          onPress={() => this.props.navigation.navigate('scandit')}
        />
      </View>
    );
  }
}


class Scandit extends React.Component {
  render() {
    return (
      <ScanditCamera />
    );
  }
}



const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    wix: Wix,
    scandit: Scandit,
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
