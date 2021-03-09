import React from 'react';
import {StyleSheet, Text, View, Modal, ActivityIndicator} from 'react-native';

const LoadingScreen = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.toggle();
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'tranparent',
          elevation: 10,
          shadowOffset: {width: 0, height: 2},
          shadowColor: 'black',
          shadowOpacity: 0.5,
        }}>
        <View
          style={{
            borderColor: '#3EB16E',
            borderWidth: 1,
            paddingLeft: 20,
            alignSelf: 'center',
            width: '90%',
            height: 100,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: 10,
          }}>
          <ActivityIndicator color="#2e74b7" size="large" />
          <Text style={{marginLeft: 20, fontSize: 20,fontFamily: "PermanentMarker-Regular"}}>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingScreen;

