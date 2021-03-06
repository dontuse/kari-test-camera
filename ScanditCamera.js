

import React, { Component } from 'react'
import { View, Dimensions, ScrollView} from 'react-native';
import { CameraKitCameraScreen } from 'react-native-camera-kit';
const width = Dimensions.get('window').width; // full width
const height = Dimensions.get('window').height; // full height
import { Container, Button, Icon, Text, Grid, Col } from 'native-base';
import uuidv4 from 'uuid/v4';
import Swipeout from 'react-native-swipeout';
import {
  BarcodePicker,
  ScanditModule,
  ScanSession,
  Barcode,
  Rect,
  SymbologySettings,
  ScanSettings,
  ScanOverlay
} from 'scandit-react-native';



export default class ScanditCamera extends React.Component {
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
      title: 'Scandit',
      
    };
  }

  componentDidMount() {
    this.settings = new ScanSettings();
    this.settings.activeScanningAreaPortrait = new Rect(0, 0.48, 1, 0.04);
    this.settings.activeScanningAreaLandscape = new Rect(0, 0.48, 1, 0.04);

    this.settings.setSymbologyEnabled(Barcode.Symbology.EAN13, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.EAN8, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.UPCA, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.UPCE, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.CODE39, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.ITF, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.QR, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.DATA_MATRIX, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.CODE128, true);

    /* Some 1d barcode symbologies allow you to encode variable-length data. By default, the
       Scandit BarcodeScanner SDK only scans barcodes in a certain length range. If your
       application requires scanning of one of these symbologies, and the length is falling
       outside the default range, you may need to adjust the "active symbol counts" for this
       symbology. This is shown in the following few lines of code. */
    this.settings.getSymbologySettings(Barcode.Symbology.CODE39)
      .activeSymbolCounts = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    /* For details on defaults and how to calculate the symbol counts for each symbology, take
       a look at http://docs.scandit.com/stable/c_api/symbologies.html. */
    this.scanner.startScanning();
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
    this.scanner.startScanning();
  }

  pauseScanning() {
    this.setState({ buttonDisabled: false });
    this.isBarcodeRead = false;

    this.scanner.pauseScanning();
  }

  stopScanning() {
    this.setState({ buttonDisabled: false });
    this.isBarcodeRead = false;
    this.scanner.pauseScanning();
  }

  startScanning() {
    this.setState({ buttonDisabled: true });
    this.isBarcodeRead = true;
    this.scanner.startScanning();
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

  onScan(session) {
    console.log('sess', session.newlyRecognizedCodes[0].data);
    // this.setState(this.state);
    // this.setTimer();

    const code = this.mapToBarcode(session.newlyRecognizedCodes[0].data);

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
        <BarcodePicker
          ref={scan => {
            this.scanner = scan;
          }}
          scanSettings={this.settings}
          onScan={session => {
            console.log('Barcode', session)
            this.onScan(session);
          }}
          style={{ height: 204 }}
        />
        {/* <Camera onReadCode={this.onReadCode} /> */}
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

