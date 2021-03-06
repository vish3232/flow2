import React from 'react';
import {StyleSheet, Text, View, Modal, ActivityIndicator,TouchableOpacity} from 'react-native';
import TrackPlayer from "react-native-track-player";
import Icon from 'react-native-vector-icons/MaterialIcons'
  

const MusicModal = (props) => {

    const { position, bufferedPosition, duration } = TrackPlayer.useTrackPlayerProgress()
    global.sliderValue=position
  // console.log(global.sliderValue)

    const togglePlayback = async () => {

        if (getStateName(playbackState) != "Playing") {
        
    
    
          try {
     
            await TrackPlayer.play();
        
          } catch (error) {
            alert(error)
          }
    
    
        } else {
    
          try {
            await TrackPlayer.pause();
          } catch (error) {
            alert(error)
          }
    
        }
      }
    
    

    const playbackState = TrackPlayer.usePlaybackState()
    function getStateName(state) {
        switch (state) {
          case TrackPlayer.STATE_NONE:
            return "None";
          case TrackPlayer.STATE_PLAYING:
            return "Playing";
          case TrackPlayer.STATE_PAUSED:
            return "Paused";
          case TrackPlayer.STATE_STOPPED:
            return "Stopped";
          case TrackPlayer.STATE_BUFFERING:
            return "Buffering";
        }
      }
    
  return (
      
       <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
          elevation: 10,
          shadowOffset: {width: 0, height: 2},
          shadowColor: 'black',
          shadowOpacity: 0.5,
          position:'absolute',
          bottom:50,
          width:"100%",
          zIndex:10
          
        }}>
        <TouchableOpacity onPress={props.clickModal}
          style={{
            borderColor: '#3EB16E',
            borderWidth: 1,
            paddingLeft: 20,
            alignSelf: 'center',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: 10,
          }}>
          <Text style={{ width:'80%',fontSize: 20}}>{props.title}</Text>
          <Icon style={{position:'absolute',right:10}} name={getStateName(playbackState) != "Playing" ? "play-arrow" : "pause"} color={'black'} size={35} onPress={togglePlayback} />
     
        </TouchableOpacity>
      </View>
  );
};

export default MusicModal;

