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

export default class Wix extends React.Component {
  state = {
    buttonDisabled: true,
    codes: [],
    cell: undefined,
    pause: true,
    isConfirmModalOpen: false,
    isBarcodeRead: false,
    ratio: undefined,
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Wix camera',
      
    };
  }

  componentDidMount() {
    this.pauseScanning();

    // this.setState({
    //   codes: [
    //     { uuid: '1', data: '2100062567756', symbology: 'sds' },
    //     { uuid: '2', data: '2100062567756', symbology: 'sds' },
    //     { uuid: '3', data: '2100062567756', symbology: 'sds' },
    //     { uuid: '41', data: '2100062567756', symbology: 'sds' },
    //     { uuid: '42', data: '2100062567756', symbology: 'sds' },
    //     { uuid: '43', data: '2100062567756', symbology: 'sds' },
    //     { uuid: '44', data: '2100062567756', symbology: 'sds' },
    //     { uuid: '45', data: '2100062567756', symbology: 'sds' },
    //     { uuid: '46', data: '2100062567756', symbology: 'sds' },
    //     { uuid: '47', data: '2100062567756', symbology: 'sds' },
    //   ],
    // });
  }

  componentWillUnmount() {
    this.stopScanning();
    // this.willBlurListener.remove();
  }

  remove(uuid) {
    this.setState({ codes: this.state.codes.filter(code => code.uuid !== uuid) });
  }

  resumeScanning() {
    this.setState({ buttonDisabled: true });
    this.isBarcodeRead = true;
  }

  pauseScanning() {
    this.setState({ buttonDisabled: false });
    this.isBarcodeRead = false;

    // this.scanner.pauseScanning();
  }

  stopScanning() {
    this.setState({ buttonDisabled: false });
    this.isBarcodeRead = false;
  }

  startScanning() {
    this.setState({ buttonDisabled: true });
    this.isBarcodeRead = true;
  }

  confirm() {
    //this.closeModal();
    // console.log('confirm', this.state);
    this.pauseScanning();
    //const type = this.props.navigation.state.params.type;
    // this.props.dispatch(
    //   tsdActions.stockAction({
    //     type,
    //     codes: this.state.codes,
    //     cell: this.state.cell,
    //   }),
    // );
    this.props.navigation.navigate('tsd/stock');
  }

  cancel() {
    this.pauseScanning();
  }

  mapToBarcode(code) {
    return {
      symbology: '',
      data: code,
      uuid: uuidv4(),
    };
  }

  addBarcode(barcode) {
    // this.props.dispatch(tsdActions.getProduct(barcode.data));
    this.setState({
      codes: [...this.state.codes, barcode],
      buttonDisabled: false,
    });
  }

  addCell(cell) {
    this.setState({ cell, isConfirmModalOpen: true });
  }

  closeModal() {
    this.setState({ isConfirmModalOpen: false, cell: undefined });
  }

  onReadCode = event => {
    const barcode = event.nativeEvent.codeStringValue;

    const code = this.mapToBarcode(barcode);

    if (this.isBarcodeRead) {
      // if (isCell(barcode)) {
      //   this.addCell(code);
      // } else {
        
      // }
      this.addBarcode(code);
      //playBeep();
      this.pauseScanning();
    }
  }

  render() {
    return (
      <Container>
        <Camera onReadCode={this.onReadCode} />
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
              borderColor: '#D6D6D6',
              borderBottomWidth: 1,
              padding: 15,
            }}
          >
            <View>
              <Text style={{ color: '#838383' }}>Кол-во отсканированных товаров</Text>
            </View>
            <View>
              <Text style={{ fontWeight: '700' }}>{this.state.codes.length}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            padding: 15,
          }}
        >
          <View style={{ flex: 0.45 }}>
            <Text
            >
              Номер
            </Text>
          </View>

        </View>
        <ScrollView>
          <View style={{ flex: 1 }}>
            {this.state.codes
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
        <Button
          full
          large
          success
          onPress={() => {
            this.resumeScanning();
          }}
          disabled={this.state.buttonDisabled}
        >
          <Text>Сканировать</Text>
        </Button>
      </Container>
    );
  }
}
