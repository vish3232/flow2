import React, { useState,useEffect } from 'react'
import { View, Text, ScrollView,Image } from 'react-native'
import Header from '../ReusableComponents/Header';
import constant from '../constant/constant'
import Card2 from '../ReusableComponents/Card2';
import Tabbar from '../ReusableComponents/Tabbar';
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Axios from 'axios'
import LoadingScreen from './LoadingScreen'
import MusicModal from './MusicModal';
import { useIsFocused } from "@react-navigation/native";

const Subcategory = (props) => {
    const isFocused = useIsFocused()

    const [subCategory,setsubCategory]=useState([])
    const [isLoading,setLoading]=useState(false)
    const [isMusicModal,setMusicModal]=useState(global.isMusicModal)

    const getSubcategoryData=async()=>{
        setLoading(true)
        console.log(props.route.params.category_id)
        Axios.post('http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:8080/audio/subCategory/all',{
            category_id:props.route.params.category_id
        }).then(res => {
            console.log(res.data)
            setLoading(false)
            setsubCategory(res.data.sub_categoryData)
        }).catch(err =>{ 
            setLoading(false)
            console.log(err)})
    
    }

    const navigateToMusicModal=()=>{
        console.log(global.id)
         props.navigation.push('Player',{'id':global.id, 'songsIdList':global.song, 'title':global.title,'subcategory':global.subcategory})
    }
   

    useEffect(() => {
        
        setMusicModal(global.isMusicModal)
      
        getSubcategoryData()
    }, [isFocused])

    const songs = useSelector(state => state.songs)

  
    let songs_category = songs.filter(data=>{
       return data.category === props.route.params.text

    })

    let newArray = []; 
    let uniqueObject = {}; 
    for (let i in songs_category) { 
        let objTitle = songs_category[i]['sub_category']; 
        uniqueObject[objTitle] = songs_category[i]; 
    } 
    for (let i in uniqueObject) { 
        newArray.push(uniqueObject[i]); 
    } 

    const toggle = () => {
        setLoading(!isLoading);
      }


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
        <LoadingScreen toggle={toggle} modalVisible={isLoading} />
        {isMusicModal?
        <MusicModal title={global.title} clickModal={navigateToMusicModal} />:<></>}

           <View style={{ shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,paddingLeft:15,height:50,width:'100%',flexDirection:'row',alignItems:'center',backgroundColor:'white'}} >
              <Icon onPress={()=>props.navigation.goBack()}  name="keyboard-backspace" size={40} style={{marginRight:15}} />
               <Text>{props.route.params.text}</Text>

           </View>
           <View style={{flex:1,flexDirection:"column"}} >
                <Image resizeMode="cover" style={{width:'100%',height:'100%'}} source={{uri:props.route.params.image}} />
           </View>
            <View style={{ flex:2,marginBottom: 50 }}>
                <ScrollView>
                    <Text style={{ color: 'white', marginHorizontal: 20 }}></Text>
                    {
                        subCategory.map(data => {
                            return (
                             <Card2 title={data.sub_category_name} key={data._id} click={() => props.navigation.push('Playlist',{'category':data.sub_category_name,'sub':data._id,'image':props.route.params.image})} />
                            )
                        })
                    }
                </ScrollView>
            </View>
            <Tabbar click={() => props.navigation.push('Home')} click4={()=> props.navigation.navigate('Blogs')} click2={() => props.navigation.navigate('Profile')} click3={()=> props.navigation.navigate('Premium')} />
        </View>
    )
}

export default Subcategory
