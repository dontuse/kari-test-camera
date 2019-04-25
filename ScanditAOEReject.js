import React, { Component } from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
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
    ratio: undefined
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Scandit'
    };
  };

  componentDidMount() {
    this.settings = new ScanSettings();
    // this.settings.activeScanningAreaPortrait = new Rect(0, 0.48, 1, 0.04);
    // this.settings.activeScanningAreaLandscape = new Rect(0, 0.48, 1, 0.04);

    this.settings.setSymbologyEnabled(Barcode.Symbology.EAN13, true);
    this.settings.matrixScanEnabled = true;

    this.settings.codeDuplicateFilter = -1;
    this.settings.maxNumberOfCodesPerFrame = 40;

    this.settings.codeRejectionEnabled = true;

    this.settings.highDensityModeEnabled = true;
    // this.settings.matrixScanEnabled    = true;

    // this.scanner.setVibrateEnabled(false);
    // this.scanner.setBeepEnabled(false)

    // this.scanner.applySettings()

    console.log('Scandit.ScanOverlay.GuiStyle', ScanOverlay.MatrixScanState);

    this.scanner.setGuiStyle(ScanOverlay.GuiStyle.MATRIX_SCAN);
    this.scanner.setMatrixScanHighlightingColor('stateLocalized', 'orange');
    // this.scanner.setMatrixScanHighlightingColor('stateRecognized','#dc101070');
    this.scanner.setMatrixScanHighlightingColor('stateRejected', 'red');

    // this.scanner.setMatrixScanHighlightingColor('stateLocalized', 'blue');
    // MATRIX_SCAN_STATE_LOCALIZED
    this.resumeScanning();

    // this.pauseScanning();

    this.willBlurSubscription = this.props.navigation.addListener('willBlur', payload => {
      console.debug('didBlur', payload);
      this.pauseScanning();
    });

    this.willFocusSubscription = this.props.navigation.addListener('willFocus', payload => {
      console.debug('didBlur', payload);
      this.resumeScanning();
    });
  }

  componentWillUnmount() {
    console.log('unmount ====');
    this.stopScanning();
    // this.willBlurListener.remove();
    this.willBlurSubscription.remove();
    this.willFocusSubscription.remove();
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
    // this.setState({ buttonDisabled: false });
    this.isBarcodeRead = false;
    this.scanner.stopScanning();
    // this.scanner.pauseScanning();
  }

  startScanning() {
    this.setState({ buttonDisabled: true });
    this.isBarcodeRead = true;
    this.scanner.startScanning();
  }

  cancel() {
    this.pauseScanning();
  }

  mapToBarcode(code) {
    return {
      symbology: '',
      data: code,
      uuid: uuidv4()
    };
  }

  addBarcode(barcode) {
    // this.props.dispatch(tsdActions.getProduct(barcode.data));
    this.setState({
      codes: [...this.state.codes, ...barcode],
      buttonDisabled: false
    });
  }

  addCell(cell) {
    this.setState({ cell, isConfirmModalOpen: true });
  }

  closeModal() {
    this.setState({ isConfirmModalOpen: false, cell: undefined });
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
      // this.pauseScanning();
    }
  }

  onRecognizeNewCodes = session => {
    console.log('onRecognizeNewCodes', session);

    // session.rejectCode('01204090@36@47908@0000000009')
    // let i = 0;

    session.newlyTrackedCodes.forEach(function(barcode) {
      if (barcode.data !== '2100036142410') {
        
        //console.log('i', i);

        session.rejectTrackedCode(barcode);
      }
    });

    session.newlyTrackedCodes.forEach(x => {
      console.log('x', x);
      //session.rejectCodes(x);
    });

    console.log(' newlyRecognizedCodes ', session.newlyRecognizedCodes);

    const newCodes = session.newlyTrackedCodes.filter(x => !this.state.codes.find(y => y.data === x.data));

    const codes = newCodes.map(x => this.mapToBarcode(x.data));

    this.addBarcode(codes);
  };

  goToDetails = () => {
    console.log('this.state', this.state);
    this.props.navigation.navigate('aoeDetails', { codes: this.state.codes });
  };

  render() {
    return (
      <Container>
        <BarcodePicker
          ref={scan => {
            this.scanner = scan;
          }}
          onRecognizeNewCodes={this.onRecognizeNewCodes}
          scanSettings={this.settings}
          onScan={session => {
            console.log('Barcode', session);
            this.onScan(session);
          }}
          style={{ flex: 1 }}
        />
        {/* <Camera onReadCode={this.onReadCode} /> */}
        <Button full style={{ position: 'absolute', bottom: 20, right: 20 }} onPress={() => this.goToDetails()}>
          <Text> {this.state.codes.length}</Text>
          <Text>>>>>>>>>>></Text>
        </Button>
      </Container>
    );
  }
}
