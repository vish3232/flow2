import React, { useState,useEffect } from 'react'
import { View, Text, ScrollView,Image } from 'react-native'
import Header from '../ReusableComponents/Header';
import constant from '../constant/constant'
import Card2 from '../ReusableComponents/Card2';
import Tabbar from '../ReusableComponents/Tabbar';
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Axios from 'axios'
const Subcategory = (props) => {
    const [subCategory,setsubCategory]=useState([])
    const getSubcategoryData=async()=>{
        console.log(props.route.params.category_id)
        Axios.post('http://192.168.130.254:5000/audio/subCategory/all',{
            category_id:props.route.params.category_id
        }).then(res => {
            console.log(res.data)
            setsubCategory(res.data.sub_categoryData)
        }).catch(err => console.log(err))
    
    }

    useEffect(() => {
        getSubcategoryData()
    }, [])

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


    return (
        <View style={{ flex: 1, backgroundColor: constant.background }}>
           <View style={{paddingLeft:15,height:50,width:'100%',flexDirection:'row',alignItems:'center',backgroundColor:'white'}} >
              <Icon  name="keyboard-backspace" size={40} style={{marginRight:15}} />
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
                             <Card2 title={data.sub_category_name} key={data._id} click={() => props.navigation.navigate('Playlist',{'category':props.route.params.text,'sub':data.sub_category})} />
                            )
                        })
                    }
                </ScrollView>
            </View>
            <Tabbar click={() => props.navigation.navigate('Home')} click4={()=> props.navigation.navigate('Blogs')} click2={() => props.navigation.navigate('Profile')} click3={()=> props.navigation.navigate('Premium')} />
        </View>
    )
}

export default Subcategory
