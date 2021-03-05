import React, { useEffect,useState } from 'react'
import { View, BackHandler,ScrollView, Dimensions, Text, StatusBar, ActivityIndicator,TouchableOpacity } from 'react-native'
import Card from '../ReusableComponents/Card';
import constant from '../constant/constant'
import Tabbar from '../ReusableComponents/Tabbar';
import Header from '../ReusableComponents/Header';
import Axios from 'axios'
import {getPaymentStatus} from '../constant/storage'
import LinearGradient from 'react-native-linear-gradient';
import LoadingScreen from './LoadingScreen'
import MusicModal from './MusicModal';

const Home = (props) => {
    const [isLoading,setLoading]=useState(false)
    const [songs,setSongs]=useState([])
    const [title,setTitle]=useState([])
    const [category,setCategory]=useState([])
    const [isMusicModal,setMusicModal]=useState(global.isMusicModal)


    useEffect(() => {
       setMusicModal(global.isMusicModal)
        getTitleData()
        getCategoryData()
    }, [])

    const getTitleData=async()=>{
        setLoading(true)
        Axios.get('http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:8080/audio/title/all').then(res => {
            if(res.data. message==="success"){
            setTitle(res.data.titleData)
            setLoading(false)
            }
        }).catch(err => console.log(err))
    }

    const getCategoryData=async()=>{
        setLoading(true)
        Axios.get('http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:8080/audio/category/all').then(res => {
        if(res.data.message==="success"){
            setLoading(false)    
        setCategory(res.data.categoryData)
        }
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

    const toggle = () => {
        setLoading(!isLoading);
    };

    const trailPlanSubcription=async()=>{
        setLoading(true)
        const today=new Date()
        
        axios.post(`http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:8080/trail/createTrail`,{
            userId:'',
            start_Date:today,
            end_Date:   new Date(Date.now() + (30 * 24 * 60 * 60 * 1000))
        }).then(res=>{
            if(res.data.message==="Trail exists"){
                setLoading(false)
                alert(res.data.message)
            }
        }).catch((err)=>{
            setLoading(false)
            console.log(err)
        })
    }

    
    

    const navigateToMusicModal=()=>{
        console.log(global.id)
         props.navigation.push('Player',{'isModalOpen':'true','currentTime':global.sliderValue,'id':global.id, 'songsIdList':global.song, 'title':global.title,'subcategory':global.subcategory})
    }
    
   

    return (
        <View style={{flex:1}}>
        <LoadingScreen toggle={toggle} modalVisible={isLoading} />
        {isMusicModal?
        <MusicModal title={global.title} clickModal={navigateToMusicModal} />:<></>}
       
           <View style={{ flex: 1, backgroundColor: constant.background }}>
            
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
                                    i == 0 ? <Card title={data.category_name} description={data.category_decscription} source={{ uri: 'http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:8080/' + data.filename }}  style={{ marginRight: 20, backgroundColor: '#95d3e9', marginBottom:10 }} key={i} click={() => props.navigation.navigate('Subcategory', { category_id: data._id,image: 'http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:8080/' + data.filename,text:data.category_name })} /> :
                                        <Card title={data.category_name} description={data.category_decscription} source={{ uri: 'http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:8080/' + data.filename }} style={{ marginRight: 20, backgroundColor: '#95d3e9', marginBottom:10 }} key={i} click={() => props.navigation.navigate('Subcategory', { category_id: data._id,image: 'http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:8080/' + data.filename,text:data.category_name })} />
                                )
                                }
                            })
                        }
                    </ScrollView>
                    </View>
                        )
                        })
                    }
                   <Text style={{ color: '#a9b7cb', fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>Premium</Text>
                    <LinearGradient  start={{x: 0.4, y: 0.5}} end={{x: 0.5, y: 1}}
   colors={['#b92b27','#1565C0']} style={{alignSelf:'center',width:'90%',marginBottom:80,height:200,borderRadius:15,justifyContent:'space-around'}} >
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginHorizontal:10}}>
                        <Text style={{paddingHorizontal:10,fontSize:20,color:'white',fontWeight:'bold'}}>Premium Family</Text>
                    </View>
                        <Text style={{width:'90%',alignSelf:'center',color:'white'}}>Lorem ipsum dolor sit amet, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</Text>
                        <TouchableOpacity onPress={()=>trailPlanSubcription()} style={{width:'80%',backgroundColor:'white',height:40,alignSelf:'center',justifyContent:'center',borderRadius:10}}>
                            <Text style={{paddingHorizontal:10,fontSize:20,fontWeight:'bold',alignSelf:'center'}}>Try 1 month free</Text>
                        </TouchableOpacity>
                </LinearGradient>
                </ScrollView>
                <Tabbar click={() => props.navigation.navigate('Home')} click4={()=> props.navigation.navigate('Blogs')} click2={() => props.navigation.navigate('Profile')} click3={()=> props.navigation.navigate('Premium')} />
            </View>
        </View>
    )

}


export default Home
