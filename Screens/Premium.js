import React,{useState,useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ToastAndroid,ScrollView } from 'react-native';
import axios from 'axios';
import data from '../constant/constant'
import Tabbar from '../ReusableComponents/Tabbar';
import LinearGradient from 'react-native-linear-gradient';
import {getEmail,getName,savePaymentStatus,getPaymentStatus} from '../constant/storage';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/MaterialIcons'

const Premium = (props) => {
    const [purpose,setPurpose]=useState('Flow Premium')
    const [amount,setAmount]=useState('200')
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [subcription,setSubcription]=useState('Flow Free')
    useEffect(() => {
        // Your code here
        getEmail().then((mail) => {

          setEmail(JSON.parse (mail))
        });
        getName().then((fullname) => {

          setName(JSON.parse (fullname))
        });
        getPaymentStatus().then((paymentStatus) => {
            
            setSubcription(JSON.parse(paymentStatus))
            
          });
  
        checkPaymentStatus()
  
      }, [])
    
    const  processInfo=async()=> {

            axios.post(`${data.url}/payment/instamojo`,{

                purpose: 'Flow Premium',
                amount: '200',
                buyer_name: name,
                email: email,

            })
                .then(function (response) {
                   console.log(response)
                    if (response.data.statusCode === 200) {
                        //we got success from server ,now pass it to our webview
                        ToastAndroid.show('Redirecting to payment gateway', ToastAndroid.SHORT);
                        props.navigation.navigate('Webview',{url:response.data.url})
                        checkPaymentStatus()
                    }
                })
                .catch(function (error) {
                    console.log(JSON.stringify(error));
                    ToastAndroid.show('Error', ToastAndroid.SHORT);
                })
        

    }

    const checkPaymentStatus=()=>{
        let deviceId = DeviceInfo.getDeviceId();
        axios.get('https://flow-mobile-backend.herokuapp.com/payment/instamojo/').then(function(response){
             
        //console.log(response.data.paymentData.payment_request.status)
        savePaymentStatus(JSON.stringify(response.data.paymentData.payment_request.status==="Completed"?"Premium":"Free"))
            axios.post(`https://flow-mobile-backend.herokuapp.com/payment/addpayment/`+deviceId,{
               deviceId:deviceId,
               payment_id:response.data.paymentData.payment_request.id,
               date:response.data.paymentData.payment_request.created_at,
               paymentStatus: response.data.paymentData.payment_request.status==="Completed"?"Premium":"Free"
            })
        }).then(function(response){
            
        }).catch(function(err){
            console.log(err)
        })
    }


    return (
        <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{flexGrow:1}} >
        <View style={{  shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,backgroundColor:'white',flexDirection:"row",height: 50, paddingHorizontal: 15, alignItems: 'center', elevation: 1 }}>
                <Icon onPress={()=>props.navigation.goBack()} name="keyboard-backspace" size={40} style={{marginRight:15}} />
                <Text>Premium</Text>

            </View>
          
                <View style={{marginTop:15,justifyContent:'center'}}>
                    <View style={{borderRadius:20,backgroundColor:'#616161',width:'90%',height:60,marginHorizontal:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={{paddingHorizontal:10,fontSize:20,color:'white',fontWeight:'bold'}}>Current Plan</Text>
                        <Text style={{paddingHorizontal:10,fontSize:18,color:'#212121'}}>Free</Text>
                    </View>

                </View>
                <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
                <LinearGradient  start={{x: 0.4, y: 0.5}} end={{x: 0.5, y: 1}}
   colors={['#b92b27','#1565C0']} style={{marginTop:50,width:'90%',height:300,borderRadius:15,justifyContent:'space-around'}} >


                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginHorizontal:10}}>
                            <Text style={{paddingHorizontal:10,fontSize:20,color:'white',fontWeight:'bold'}}>Try Premium for 1 month</Text>
                            </View>
                            <Text style={{width:'90%',alignSelf:'center',color:'white'}}>Lorem ipsum dolor sit amet, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</Text>
                        <TouchableOpacity style={{width:'80%',backgroundColor:'white',height:40,alignSelf:'center',justifyContent:'center',borderRadius:10}}>
                            <Text style={{paddingHorizontal:10,fontSize:20,fontWeight:'bold',alignSelf:'center'}}>Try 1 month free</Text>
                        </TouchableOpacity>
                </LinearGradient>
                </View>
                <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
                <LinearGradient start={{x: 0.4, y: 0.5}} end={{x: 0.5, y: 1}} colors={['#fff59d','#f57f17']} style={{marginTop:50,width:'90%',height:300,borderRadius:15,justifyContent:'space-around',marginBottom:80}} >
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginHorizontal:10}}>
                            <Text style={{paddingHorizontal:10,fontSize:20,color:'white',fontWeight:'bold'}}>Premium for 200/month</Text>
                            </View>
                            <Text style={{width:'90%',alignSelf:'center',color:'white'}}>Lorem ipsum dolor sit amet, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</Text>
                        <TouchableOpacity onPress={()=>processInfo()} style={{justifyContent:'center',width:'80%',backgroundColor:'white',height:40,alignSelf:'center',borderRadius:10}}>
                            <Text style={{paddingHorizontal:10,fontSize:20,fontWeight:'bold',alignSelf:'center'}}>Buy Premium Now</Text>
                        </TouchableOpacity>
                </LinearGradient>
                
                </View>
                </ScrollView>
                <Tabbar click={() => props.navigation.navigate('Home')} click4={()=> props.navigation.navigate('Blogs')} click2={() => props.navigation.navigate('Profile')} click3={()=> props.navigation.navigate('Premium')} />
            </View>

      )
}

export default Premium

