import React, { useEffect } from 'react'
import { Alert,View, BackHandler,ScrollView, Dimensions, Text, StatusBar, ActivityIndicator } from 'react-native'
import Card from '../ReusableComponents/Card';
import constant from '../constant/constant'
import Tabbar from '../ReusableComponents/Tabbar';
import Header from '../ReusableComponents/Header';
import { useDispatch } from 'react-redux'
import {loadSongs} from '../Redux/Action'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import {getPaymentStatus} from '../constant/storage'


const Home = (props) => {

    useEffect(() => {
        getPaymentStatus().then((paymentStatus) => {
            dispatch(loadSongs(JSON.parse(paymentStatus)))
       
            
          });
          BackHandler.addEventListener('hardwareBackPress', handleBackButton);
          return () => {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
           
        }
 
    }, [])

   const  handleBackButton = () => {
    BackHandler.exitApp()
       } 
    const dispatch = useDispatch()

    const { height, width } = Dimensions.get('window')
    const songs = useSelector(state => state.songs)
    const loading = useSelector(state => state.isloading)
    const error = useSelector(state => state.error)

    console.log(loading)

    let newArray = [];
    let uniqueObject = {};
    for (let i in songs) {
        let objTitle = songs[i]['category'];
        uniqueObject[objTitle] = songs[i];
    }
    for (let i in uniqueObject) {
        newArray.push(uniqueObject[i]);
    }

  


    return (
        <View style={{flex:1}}>
            {loading === true ? <View  style={{flex: 1, justifyContent:'center', alignItems:'center'}}><ActivityIndicator size="large" color='#0000ff' /></View> : <View style={{ flex: 1, backgroundColor: constant.background }}>

                <StatusBar backgroundColor="#2e74b7" barStyle="light-content" />
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <Header />
                    <Text style={{ color: '#a9b7cb', marginTop: 20, fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>Popular</Text>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        decelerationRate={0}
                        snapToInterval={width - 20}
                        snapToAlignment={"center"}
                        contentContainerStyle={{ marginTop: 5 }}>
                        {
                            newArray.map((data, i) => {
                                return (
                                    i == 0 ? <Card title={data.category} style={{ marginRight: 20, backgroundColor: '#95d3e9', marginLeft: 15, marginBottom:10 }} key={i} click={() => props.navigation.navigate('Subcategory', { text: data.category })} /> :
                                        <Card title={data.category} style={{ marginRight: 20, backgroundColor: '#95d3e9', marginBottom:10 }} key={i} click={() => props.navigation.navigate('Subcategory', { text: data.category })} />
                                )
                            })
                        }
                    </ScrollView>

                    <Text style={{ color: '#a9b7cb', fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>New</Text>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        decelerationRate={0}
                        snapToInterval={width - 20}
                        snapToAlignment={"center"}
                        contentContainerStyle={{ marginTop: 5, marginBottom: 20 }}>
                        <Card style={{ marginRight: 20, marginLeft: 15, marginBottom:10 }} key={1} />
                        <Card style={{ marginRight: 20, marginBottom:10 }} key={2} />
                        <Card style={{ marginRight: 20, marginBottom:10 }} key={3} />
                        <Card style={{ marginRight: 20, marginBottom:10 }} key={4} />
                    </ScrollView>
                </ScrollView>
                <Tabbar click={() => props.navigation.navigate('Home')} click4={()=> props.navigation.navigate('Blogs')} click2={() => props.navigation.navigate('Profile')} click3={()=> props.navigation.navigate('Premium')} />
            </View>
            }
        </View>
    )

}


export default Home
