import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Header from '../ReusableComponents/Header';
import constant from '../constant/constant'
import Card2 from '../ReusableComponents/Card2';
import Tabbar from '../ReusableComponents/Tabbar';
import { useSelector } from 'react-redux'


const Subcategory = (props) => {

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
            <Header />
            <View style={{ marginBottom: 50 }}>
                <ScrollView>
                    <Text style={{ color: 'white', marginHorizontal: 20 }}></Text>
                    <Text style={{ fontSize: 18, color: constant.white, marginHorizontal: 20 }}>Sub-Category</Text>
                    {
                        newArray.map(data => {
                            return (
                             <Card2 title={data.sub_category} key={data._id} click={() => props.navigation.navigate('Playlist',{'category':props.route.params.text,'sub':data.sub_category})} />
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
