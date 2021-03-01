import React, { useEffect,useState } from 'react'
import { Alert,View, BackHandler,ScrollView, Dimensions, Text, StatusBar, ActivityIndicator } from 'react-native'
import Card from '../ReusableComponents/Card';
import constant from '../constant/constant'
import Tabbar from '../ReusableComponents/Tabbar';
import Header from '../ReusableComponents/Header';
import Axios from 'axios'
import {getPaymentStatus} from '../constant/storage'


const Home = (props) => {
    const [loading,setLoading]=useState(false)
    const [songs,setSongs]=useState([])
    const [title,setTitle]=useState([])
    const [category,setCategory]=useState([])


    useEffect(() => {
       
        getTitleData()
        getCategoryData()
    }, [])

    const getTitleData=async()=>{
        Axios.get('http://192.168.130.254:5000/audio/title/all').then(res => {
            setTitle(res.data.titleData)
        }).catch(err => console.log(err))
    }

    const getCategoryData=async()=>{
        Axios.get('http://192.168.130.254:5000/audio/category/all').then(res => {
            setCategory(res.data.categoryData)
        }).catch(err => console.log(err))
    }

   
    const { height, width } = Dimensions.get('window')
   
   
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
                <ScrollView style={{backgroundColor:'white'}} showsHorizontalScrollIndicator={false}>
                    <Header />
                    {title.map((data1)=>{
                        return(
                            <View style={{marginHorizontal:20}} >
                            <Text style={{fontSize:20,fontWeight:'bold'}} >{data1.name}</Text>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        decelerationRate={0}
                        snapToInterval={width - 20}
                        snapToAlignment={"center"}
                        contentContainerStyle={{ marginTop: 5 }}>
                        
                        {
                            category.map((data, i) => {
                                if(data1._id===data.title_id){
                                    
                                return (
                                    i == 0 ? <Card title={data.category_name} description={data.category_decscription} source={{ uri: 'http://192.168.130.254:5000/' + data.filename }}  style={{ marginRight: 20, backgroundColor: '#95d3e9', marginBottom:10 }} key={i} click={() => props.navigation.navigate('Subcategory', { category_id: data._id,image: 'http://192.168.130.254:5000/' + data.filename,text:data.category_name })} /> :
                                        <Card title={data.category_name} description={data.category_decscription} source={{ uri: 'http://192.168.130.254:5000/' + data.filename }} style={{ marginRight: 20, backgroundColor: '#95d3e9', marginBottom:10 }} key={i} click={() => props.navigation.navigate('Subcategory', { category_id: data._id,image: 'http://192.168.130.254:5000/' + data.filename,text:data.category_name })} />
                                )
                                }
                            })
                        }
                    </ScrollView>
                    </View>
                        )
                })
                    }

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
