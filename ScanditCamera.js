import React, { Component } from 'react';
import { BarcodePicker, ScanditModule, Barcode, ScanSettings } from 'scandit-react-native';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
// Set your license key.
ScanditModule.setAppKey(
  'AfN8D1hKRVGpNTmJfxRiwrAlYOjPJs8EmGXlCghtIHa7fT+wgXbTocgia7R6d5Bcxnc8sepW6sNGAybofGIVnHZ+LFuXWhA3Wjfde6lx2FQ7YrSSpHbADYQuIVKKGso32yH7zFIP3ObpRx+Bzb4F15+AZXpRyLOeAz3TJLNnkrmXTr1lu6DmJnEc6wkXlP0juUyNouhSGCqFaguBdje0pYc3gUrs6Yw/1aGtOGctiDPZu2ct/+G4xSp3CL0zhNTiBRSqGCHM8GiMj8iai071XHCsZzcCV4+wLVhhu/IcYPH6tBi3P8ArfT/g+OfQymtzbFJYXzbS+a9/qocNG88vT49+LrGIO+d93TEbVGb3XARP5dU8wDjB+5fhL26Zw/skfsu38TayHlM/AaRhj6wYMl6cctoNW5gty+kMhezh5ycYlSRvGqF1YQowvLlC9Ns6AbhagTIsgfY398M3ZrdxTDjZvRGhnKTCO63N5Y36XLhnQRVrOrN/H7Izf8+4/nmpiycQypRtL8Hfp6kDxC7yxQ0cQ/2tsDgKhBgXkwj6n78SAqWPem/jE+Ar925O5kraEjhQfwWJLLRMzmpIEI1CAcqV4KStbCm/f2csykdHa+QEsmRHEsFGeSrYN3r6/s2gg/tNiDAi5aN/lxnIdOQpx+9qMJrxKtD5P14KIAYdmkipMHKqpHDvvgBN7kdjqqx4bEca6VoChIjY5ZF4HsL2lKRjIF+hvkwESqUbvD4NqsJFy4uGjALpOJX2jEk5Ph7TlEKY11DKULthk6hfs+A3cV6zv3KFMi8CQwGa/iOG9kM1w1LxUCQ='
);

this.settings = new ScanSettings();
this.settings.setSymbologyEnabled(Barcode.Symbology.EAN13, true);
this.settings.setSymbologyEnabled(Barcode.Symbology.EAN8, true);
this.settings.setSymbologyEnabled(Barcode.Symbology.UPCA, true);

export default class ScanditCamera extends Component {
  componentDidMount() {
    this.scanner.startScanning();
  }
  render() {
    return (
      <View>
        <BarcodePicker
          ref={scan => {
            this.scanner = scan;
          }}
          scanSettings={this.settings}
          onScan={session => {
            this.onScan(session);
          }}
          style={{ height: 204 }}
        />
      </View>
    );
  }
}
