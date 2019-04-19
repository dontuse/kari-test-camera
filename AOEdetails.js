import React, { Component } from 'react'
import { View, Dimensions, ScrollView} from 'react-native';
import { CameraKitCameraScreen } from 'react-native-camera-kit';
const width = Dimensions.get('window').width; // full width
const height = Dimensions.get('window').height; // full height
import { Container, Button, Icon, Text, Grid, Col } from 'native-base';
import uuidv4 from 'uuid/v4';
import Swipeout from 'react-native-swipeout';

 class Camera extends React.Component {
  render() {
    return (
      <View style={{ height: 204, overflow: 'hidden', backgroundColor: 'white' }}>
        <CameraKitCameraScreen
          scanBarcode={true}
          frameColor={'#1AA855'}
          style={{ flex: 1, overflow: 'hidden', marginTop: -(height / 2) + 102, backgroundColor: 'white' }}
          onReadCode={this.props.onReadCode}
          hideControls={true}
          showFrame={true}
          colorForScannerFrame={'red'}
          isShowFrameForScanner
          laserColor={'red'}
        />
      </View>
    );
  }
}

export default class AOEdetails extends React.Component {


  render() {
    return (
      <Container>
      
        <ScrollView>
          <View style={{ flex: 1 }}>
            {this.props.navigation.getParam('codes')
              .slice()
              .reverse()
              .map(code => {
                // const product = this.props.products[code.data];
                return (
                  <Swipeout
                    style={{ marginBottom: 10 }}
                    key={code.uuid}
                    backgroundColor="white"
                    buttonWidth={54}
                    right={[
                      {
                        component: (
                          <Button danger full style={{ height: '100%' }} onPress={() => this.remove(code.uuid)}>
                            <Icon style={{ color: '#FFFFFF', fontSize: 22 }} type="FontAwesome" name="trash-o" />
                          </Button>
                        ),
                      },
                    ]}
                  >
                    <View
                      style={{ paddingLeft: 20, marginBottom: 0, borderWidth: 2, borderColor: 'gray', padding: 15, flex: 1 }}
                    >
                      <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                        <View style={{ flex: 1 }}>
                          <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: '600' }}>
                            {code.data}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Swipeout>
                );
              })}
          </View>
        </ScrollView>
        {/* <Button
          full
          large
          success
          onPress={() => {
            this.resumeScanning();
          }}
          disabled={this.state.buttonDisabled}
        >
          <Text>Сканировать</Text>
        </Button> */}
      </Container>
    );
  }
}