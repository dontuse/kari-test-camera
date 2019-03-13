import React, { Component } from 'react'
import { View, Dimensions, Text } from 'react-native';
import { CameraKitCameraScreen } from 'react-native-camera-kit';
const width = Dimensions.get('window').width; // full width
const height = Dimensions.get('window').height; // full height

export default class Wix extends Component {
  render() {
    return (
      <View>
        <Camera></Camera>
        <View><Text>dkfodsfkosdfo</Text></View>
      </View>
    )
  }
}

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