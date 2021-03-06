import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import constant from '../constant/constant'
import Icon from 'react-native-vector-icons/MaterialIcons'
import LinearGradient from 'react-native-linear-gradient';
import TrackPlayer from "react-native-track-player";
import Progressbar from '../ReusableComponents/Progressbar';
import AsyncStorage from '@react-native-community/async-storage';

let i = 0
global.playList=[]
const Player = (props) => {

  const playbackState = TrackPlayer.usePlaybackState()
  const [slidervalue, setslidervalue] = useState(0)
  const [end, setend] = useState(0)
  const [flag, setflag] = useState(1)

const tp =props.route.params.songsIdList
  const songsId = props.route.params.songsIdList.filter(data => {
    return data != props.route.params.id
  })

  let obj = {
    id: '',
    url: '',
    title: 'Track Title',
  }

  let listOfSongs = []
  songsId.map(data1 => {
    obj.id = data1._id;
    obj.url = 'http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:8080/audio/song/' + data1._id;
    obj.title=data1.filename
    listOfSongs.push(obj)
  })


  useEffect(() => {
    
    TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ]
    });
    resetPlayer()
    togglePlayback()
    
  }, []);

  

 
 
  const resetPlayer = async () => {
    await TrackPlayer.reset();
  }



  const togglePlayback = async () => {
    
    global.isMusicModal=true
    global.id=props.route.params.id
global.song=props.route.params.songsIdList
global.subcategory=props.route.params.subcategory
     
    if (getStateName(playbackState) != "Playing") {
      try {
        
        global.title=props.route.params.title
        await TrackPlayer.add({
          id:props.route.params.id ,
          url: 'http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:8080/audio/song/' + props.route.params.id,
          title: props.route.params.title,
          //artwork: require('track.png')
        })
        goto(global.sliderValue)
      } catch (error) {
        console.log(error)
      }


      try {
        await TrackPlayer.add(listOfSongs);
      } catch (error) {
        alert(error)
      }


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


  const goto = (data) => {
    TrackPlayer.seekTo(data);
    setslidervalue(data)
    
  }


  const ProgressBar = () => {
    const { position, bufferedPosition, duration } = TrackPlayer.useTrackPlayerProgress()
    if (position != 0) {
      i = position
    }

    if (flag === 1 && duration != 0) {
      setend(duration)
      setflag(0)
    }


    if (getStateName(playbackState) === "Paused") {
      return <Progressbar position={i} duration={end} goto={goto} />
    }
    if (getStateName(playbackState) === "Buffering" || position === 0) {
    
      return <Progressbar position={slidervalue} duration={end} goto={goto} />
    } else {
      return <Progressbar position={position} duration={duration} goto={goto} />
    }
  }







  const nextSong = async () => {
    try {
     
       
      await TrackPlayer.skipToNext();
      const song=await TrackPlayer.getCurrentTrack()
      console.log(song)
      for(var i=0;i<props.route.params.songsIdList.length;i++){
        if(props.route.params.songsIdList[i]._id===song){
         props.route.params.title=props.route.params.songsIdList[i].filename
        
        }
      }
  

   } catch (error) {
      togglePlayback()
    }
  }

  const previousSong = async () => {
    try {
    //  alert(JSON.stringify(listOfSongs))

      await TrackPlayer.skipToPrevious();
      const song=await TrackPlayer.getCurrentTrack()
      console.log(song)
      for(var i=0;i<props.route.params.songsIdList.length;i++){
       // alert(global.id)
        if(props.route.params.songsIdList[i]._id===song){
         
         props.route.params.title=props.route.params.songsIdList[i].filename
        
        }
      } 
      
    } catch (error) {
     togglePlayback()
    }
  }




  return (

    <LinearGradient colors={['#4c669f', constant.background]} style={{ flex: 1 }}>
      <View style={{ height: 50,flexDirection:'row', alignItems: 'center',paddingHorizontal:20 }}>
      <Icon onPress={()=>props.navigation.goBack()} name="keyboard-backspace" color="black" style={{marginRight:15}}  size={40} />

      </View>
      <Image source={{ uri: 'https://images.unsplash.com/photo-1444491741275-3747c53c99b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }} style={{ width: '90%', height: '40%', alignSelf: 'center', marginTop: 40 }}></Image>
      <View style={{ marginTop: 10,flexDirection:'column',alignItems:'center',justifyContent:'center' }}>
        <Text style={{ color: constant.white, fontWeight: 'bold', fontSize: 18, alignSelf: 'center',fontFamily: "PermanentMarker-Regular" }}>{props.route.params.subcategory}</Text>

        <Text style={{ color: constant.white, fontWeight: 'bold', fontSize: 18, alignSelf: 'center',width:'90%',fontFamily: "PermanentMarker-Regular" }}>{props.route.params.title}</Text>
      </View>

      <ProgressBar />

      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
        <Icon name="fast-rewind" color={'white'} size={35} onPress={() => previousSong()} />
        <View style={{ height: 50, width: 50, borderRadius: 40, backgroundColor: 'white',elevation:5, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name={getStateName(playbackState) != "Playing" ? "play-arrow" : "pause"} color={'black'} size={35} onPress={togglePlayback} />
        </View>
        <Icon name="fast-forward" color={'white'} size={35} onPress={() => nextSong()} />
      </View>
    </LinearGradient>

  )
}


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



export default Player
