import React, { useEffect,useState } from 'react'
import { View, Text, Image, ScrollView, AsyncStorage } from 'react-native'
import constant from '../constant/constant'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Card3 from '../ReusableComponents/Card3';
import Tabbar from '../ReusableComponents/Tabbar';
import { useSelector } from 'react-redux'
import Axios from 'axios'


const Playlist = (props) => {
    const [song,setSong]=useState([])
    
    useEffect(() => {
       getPlaylistData()
    }, [])

    const getPlaylistData=async()=>{
        Axios.post('http://192.168.76.254:5000/audio/all',{
            sub_category_id:props.route.params.sub,
            audioStatus:"Free"
        }).then(res => {
            setSong(res.data.songData)
        }).catch(err => console.log(err))
    
    }
    
  
    return (
        <View style={{ flex: 1, backgroundColor: constant.background }}>
            <View style={{ flexDirection: 'row', height: 50, alignItems: 'center', paddingHorizontal: 20,backgroundColor:'white' }}>
                <Icon name="keyboard-backspace" color="black" style={{marginRight:15}}  size={30} />
                <Text>{props.route.params.category}</Text>
            </View>
            <View style={{flex:1,flexDirection:"column"}} >
                <Image resizeMode="cover" style={{width:'100%',height:'100%'}} source={{uri:props.route.params.image}} />
           </View>
          
            <ScrollView>
                {
                    song.map(data => {
                        return <Card3 title={data.filename} click={()=> props.navigation.navigate('Player',{'id':data._id, 'songsIdList':song, 'title':data.filename,'subcategory':props.route.params.category})} key={data._id} />
                    })
                }
            </ScrollView>
            <Tabbar click={() => props.navigation.navigate('Home')} click4={()=> props.navigation.navigate('Blogs')} click2={() => props.navigation.navigate('Profile')} click3={()=> props.navigation.navigate('Premium')} />
        </View>
    )
}

export default Playlist
