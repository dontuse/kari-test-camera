import { BarcodePicker, ScanditModule, Barcode, ScanSettings } from 'scandit-react-native';

import React, { Component } from 'react'
import { View, Dimensions, ScrollView} from 'react-native';
import { CameraKitCameraScreen } from 'react-native-camera-kit';
const width = Dimensions.get('window').width; // full width
const height = Dimensions.get('window').height; // full height
import { Container, Button, Icon, Text, Grid, Col } from 'native-base';
import uuidv4 from 'uuid/v4';
import Swipeout from 'react-native-swipeout';


// Set your license key.
ScanditModule.setAppKey(
  'AfN8D1hKRVGpNTmJfxRiwrAlYOjPJs8EmGXlCghtIHa7fT+wgXbTocgia7R6d5Bcxnc8sepW6sNGAybofGIVnHZ+LFuXWhA3Wjfde6lx2FQ7YrSSpHbADYQuIVKKGso32yH7zFIP3ObpRx+Bzb4F15+AZXpRyLOeAz3TJLNnkrmXTr1lu6DmJnEc6wkXlP0juUyNouhSGCqFaguBdje0pYc3gUrs6Yw/1aGtOGctiDPZu2ct/+G4xSp3CL0zhNTiBRSqGCHM8GiMj8iai071XHCsZzcCV4+wLVhhu/IcYPH6tBi3P8ArfT/g+OfQymtzbFJYXzbS+a9/qocNG88vT49+LrGIO+d93TEbVGb3XARP5dU8wDjB+5fhL26Zw/skfsu38TayHlM/AaRhj6wYMl6cctoNW5gty+kMhezh5ycYlSRvGqF1YQowvLlC9Ns6AbhagTIsgfY398M3ZrdxTDjZvRGhnKTCO63N5Y36XLhnQRVrOrN/H7Izf8+4/nmpiycQypRtL8Hfp6kDxC7yxQ0cQ/2tsDgKhBgXkwj6n78SAqWPem/jE+Ar925O5kraEjhQfwWJLLRMzmpIEI1CAcqV4KStbCm/f2csykdHa+QEsmRHEsFGeSrYN3r6/s2gg/tNiDAi5aN/lxnIdOQpx+9qMJrxKtD5P14KIAYdmkipMHKqpHDvvgBN7kdjqqx4bEca6VoChIjY5ZF4HsL2lKRjIF+hvkwESqUbvD4NqsJFy4uGjALpOJX2jEk5Ph7TlEKY11DKULthk6hfs+A3cV6zv3KFMi8CQwGa/iOG9kM1w1LxUCQ='
);



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
      title: 'Wix camera',
      
    };
  }

  componentDidMount() {
    this.settings = new ScanSettings();
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

    // this.scanner.pauseScanning();
  }

  stopScanning() {
    this.setState({ buttonDisabled: false });
    this.isBarcodeRead = false;
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
    console.log('sess', session);
    this.state.codes.push({
      codes: [...this.state.codes, session.newlyRecognizedCodes[0].data],
    });
    // this.setState(this.state);
    // this.setTimer();
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

