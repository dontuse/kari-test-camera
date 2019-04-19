import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Wix from './Wix';
import WixNoBtn from './WixNoBtn';
import ScanditCamera from './ScanditCamera';
import ScanditCameraNoBtn from './ScanditCameraNoBtn';
import ScanditAOE from './ScanditAOE';
import ScanditAOE2 from './ScanditAOE2';
import AOEdetails from './AOEdetails';
import { Container, Button, Icon, Text, Grid, Col, Content } from 'native-base';
import { ScanditModule } from 'scandit-react-native';

// Set your license key.
ScanditModule.setAppKey(
  'AalcgixwMYvUHiTUsyneBEQ6NGjcFBzd93Mt6dxYdWq4f6jxNEMeQap+UgaTb6W0xmSqX+Rr/mH/YNSN2nDG010CkuGSI8XpWhBNTgJNMyWeaYEkpmrSDUZ/QxSPGm+ayxB7rWoqW8sfoYWFJ0mNQLlAXCOkXA8xgnm6dw6H7vAb2flGA+Gnrv83Fpb7iVHNfrfIhgBz51cwGizsvWM13IB/PDYSRNv5DiGBmUG7/oKd+y2QdtpjtmhKte9vMr/+uueoS5QOpZnaBz9Gvrj8A2QJwkEHr1TWebtSYH2rHFvwmHJMHu+Lpn6nOVrOpXtyepM/NZC1gm6tZnLPFg8xTPivOUnGAvVXnL8NV2SEO4dturNo5gHuHuNqVzBPdN7a8v7Sy4yzN1eTSLK0ZfMjwBmrAvELR5BMM/NdaS/KGKvpFV1JH/Q2j04XR+9oy5C7zz1B75NO0D6pWjjpjZ3RtOzIf9znKKIEqjsjpkWeONe3o6j2nCaQvIZZPeQYjKr5Zlu9uGwrOFpLnNRSpYifr7+ko7I+gqjfpalID85gPItMHhyBO4cp5st9NZ3cwSQ7xJWEiyFGdQeot99t1NhjuXRJcKkCNrkMNFyL6QbvyT/iaCCh/fR7fLGda3IwrPdruyPAzgMTtbKGOLRjRVxcOd26G8e38lfmiS1GEpBc6BbDCCgGqall6oi+ramewT25m5QivtluHHG0G5NNQjiLfe0oiLG0T9uDSOniwvc6xW9s5YGlMXfscEBsXl8nvke4JmN2zUSIJpRAo+Qo8DAuigeO3ZekyERo0QC8K6GzbVYM4vtwg7w='
);

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu'
});

class HomeScreen extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ marginBottom: 20, marginTop: 50 }}>
              <Text style={{ fontSize: 30 }}>Массовое сканирование QR:</Text>
            </View>
            <View style={{ marginBottom: 10, fontSize: 20 }}>
              <Button large success onPress={() => this.props.navigation.navigate('scandit-aoe')}>
                <Text>Scandit camera QR CODE AOE</Text>
              </Button>
            </View>
            {/* <View style={{ marginBottom: 40, fontSize: 20 }}>
              <Button large success onPress={() => this.props.navigation.navigate('scandit-aoe2')}>
                <Text>setWorkingRange LONG</Text>
              </Button>
            </View> */}
            <View style={{flex: 1, background: 'black', height: 4, width: '100%', marginBottom: 20}}>
            <Text>------------------</Text>
            </View>
            <View style={{ marginBottom: 40, fontSize: 20 }}>
              <Button large success onPress={() => this.props.navigation.navigate('wix')}>
                <Text>Wix camera</Text>
              </Button>
            </View>
            <View>
              <Button large danger onPress={() => this.props.navigation.navigate('scandit')}>
                <Text>Scandit camera</Text>
              </Button>
            </View>
            <View style={{ marginBottom: 20, marginTop: 50 }}>
              <Text style={{ fontSize: 30 }}>Без кнопки</Text>
            </View>
            <View style={{ marginBottom: 40, fontSize: 20 }}>
              <Button large success onPress={() => this.props.navigation.navigate('wix-no-button')}>
                <Text>Wix camera no button</Text>
              </Button>
            </View>
            <View style={{ marginBottom: 40, fontSize: 20 }}>
              <Button large danger onPress={() => this.props.navigation.navigate('scandit-no-button')}>
                <Text>Scandit camera no button</Text>
              </Button>
            </View>
            
          </View>
        </Content>
      </Container>
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
    'scandit-aoe': ScanditAOE,
    'scandit-aoe2': ScanditAOE2,
    aoeDetails: AOEdetails
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
