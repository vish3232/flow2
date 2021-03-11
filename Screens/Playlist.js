import React, { useEffect,useState } from 'react'
import { View, Text, Image, ScrollView, AsyncStorage } from 'react-native'
import constant from '../constant/constant'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Card3 from '../ReusableComponents/Card3';
import Tabbar from '../ReusableComponents/Tabbar';
import { useSelector } from 'react-redux'
import Axios from 'axios'
import LoadingScreen from './LoadingScreen'
import MusicModal from './MusicModal';
import { useIsFocused } from "@react-navigation/native";
import {getPaymentStatus} from '../constant/storage'

const Playlist = (props) => {
    const isFocused = useIsFocused()
    const [song,setSong]=useState([])
    const [isLoading,setLoading]=useState(false) 
    const [isMusicModal,setMusicModal]=useState(global.isMusicModal)
    const [subcription,setSubcription]=useState(null)
   
   
    useEffect(() => {
        setMusicModal(global.isMusicModal)
        getPaymentStatus().then((paymentStatus) => {
            
            setSubcription(JSON.parse(paymentStatus))
            
          });
  
       getPlaylistData()
    }, [isFocused])

     const navigateToMusicModal=()=>{
        console.log(global.id)
         props.navigation.push('Player',{'id':global.id, 'songsIdList':global.song, 'title':global.title,'subcategory':global.subcategory})
    }
   
   

    const getPlaylistData=async()=>{
        setLoading(true)
        Axios.post('http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:8080/audio/all',{
            sub_category_id:props.route.params.sub,
            audioStatus:subcription
        }).then(res => {
            setLoading(false)
            setSong(res.data.songData)
        }).catch(err =>{ 
            setLoading(false)
            console.log(err)})
    
    }

    const toggle = () => {
        setLoading(!isLoading);
      };
    
  
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
        <LoadingScreen toggle={toggle} modalVisible={isLoading} />
        {isMusicModal?
        <MusicModal title={global.title} clickModal={navigateToMusicModal} />:<></>}

       
            <View style={{  shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,flexDirection: 'row', height: 50, alignItems: 'center', paddingHorizontal: 20,backgroundColor:'white' }}>
                <Icon onPress={()=>props.navigation.goBack()} name="keyboard-backspace" color="black" style={{marginRight:15}}  size={30} />
                <Text style={{fontFamily: "PermanentMarker-Regular",fontSize:16}} >{props.route.params.category}</Text>
            </View>
            <View style={{flex:1,flexDirection:"column"}} >
                <Image resizeMode="cover" style={{width:'100%',height:'100%'}} source={{uri:props.route.params.image}} />
           </View>
          
            <ScrollView>
                {
                    song.map(data => {
                        return <Card3 title={data.filename} click={()=> props.navigation.push('Player',{'id':data._id, 'songsIdList':song, 'title':data.filename,'subcategory':props.route.params.category})} key={data._id} />
                    })
                }
            </ScrollView>
            <Tabbar click={() => props.navigation.push('Home')} click4={()=> props.navigation.navigate('Blogs')} click2={() => props.navigation.navigate('Profile')} click3={()=> props.navigation.navigate('Premium')} />
        </View>
    )
}

export default Playlist
