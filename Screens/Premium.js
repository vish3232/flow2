import React,{useState,useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ToastAndroid,ScrollView } from 'react-native';
import axios from 'axios';
import data from '../constant/constant'
import Tabbar from '../ReusableComponents/Tabbar';
import LinearGradient from 'react-native-linear-gradient';
import {getEmail,getName,savePaymentStatus,getPaymentStatus} from '../constant/storage';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/MaterialIcons'
import LoadingScreen from './LoadingScreen'
const Premium = (props) => {
    const [purpose,setPurpose]=useState('Flow Premium')
    const [amount,setAmount]=useState('200')
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [subcription,setSubcription]=useState('Flow Free')
    const [isLoading,setLoading]=useState(false)
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
        setLoading(true)

            axios.post(`${data.url}/payment/instamojo`,{

                purpose: 'Flow Premium',
                amount: '10',
                buyer_name: name,
                email: email,

            })
                .then(function (response) {
                   console.log(response)
                    if (response.data.statusCode === 200) {
                        setLoading(false)
                        //we got success from server ,now pass it to our webview
                        ToastAndroid.show('Redirecting to payment gateway', ToastAndroid.SHORT);
                        props.navigation.navigate('Webview',{url:response.data.url})
                        checkPaymentStatus()
                    }
                })
                .catch(function (error) {
                    setLoading(false)
                    console.log(JSON.stringify(error));
                    ToastAndroid.show('Error', ToastAndroid.SHORT);
                })
        

    }

    const checkPaymentStatus=()=>{
        if(subcription!=="Premium"){
        let deviceId = DeviceInfo.getDeviceId();
        console.log(global.transid)
        axios.get('http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:8080/payment/instamojo/'+global.transid).then(function(response){
             
        console.log(response.data.paymentData.payment_request.status,deviceId,new Date())
        savePaymentStatus(JSON.stringify(response.data.paymentData.payment_request.status==="Completed"?"Premium":"Free"))
    if(response.data.paymentData.payment_request.status==="Completed"){
        axios.put(`http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:8080/paymentTrack/addpayment`,{
               deviceId:deviceId,
               planId:response.data.paymentData.payment_request.status==="Completed"?"60434aa3ef0802ca34788332":"603f3991ef0802ca34788323",
               currentDate:new Date()
            }).then(function(res){
                console.log(res)
                if(res.data.message==="Updated"){
                    alert("Plan is updated...")
                }
            }).catch(function(err){
                console.log(err)
            })
        }
        })
    }else{
        alert('already plan upgraded...')
   
    }
    }

    const trailPlanSubcription=async()=>{
        if(subcription!=="Trial"){
        let deviceId = DeviceInfo.getDeviceId();

        setLoading(true)
        const today=new Date()

        savePaymentStatus(JSON.stringify("Trial"))
            axios.put(`http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:8080/paymentTrack/addpayment`,{
               deviceId:deviceId,
               planId:"6043498bef0802ca34788331",
               currentDate:new Date()
            }).then(function(res){
            if(res.data.message){
                alert(res.data.message)
            }
        }).catch(function(err){
            console.log(err)
        })
        
        axios.post(`http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:8080/trail/createTrail`,{
            userId:global.userId,
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
    }else{
        alert('already plan upgraded...')
    }
        

    }

    const toggle = () => {
        setLoading(!isLoading);
      };


    return (
        <View style={{ flex: 1 }}>
        <LoadingScreen toggle={toggle} modalVisible={isLoading} />
        <ScrollView contentContainerStyle={{flexGrow:1}} >
        <View style={{  shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,backgroundColor:'white',flexDirection:"row",height: 50, paddingHorizontal: 15, alignItems: 'center', elevation: 1 }}>
                <Icon onPress={()=>props.navigation.goBack()} name="keyboard-backspace" size={40} style={{marginRight:15}} />
                <Text style={{fontSize:16,fontFamily: "PermanentMarker-Regular"}} >Premium</Text>

            </View>
          
                <View style={{marginTop:15,justifyContent:'center'}}>
                    <View style={{borderRadius:20,backgroundColor:'#1FA2FF',width:'90%',height:60,marginHorizontal:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={{fontFamily: "PermanentMarker-Regular",paddingHorizontal:10,fontSize:20,color:'white',fontWeight:'bold'}}>Current Plan</Text>
                        <Text style={{fontFamily: "PermanentMarker-Regular",paddingHorizontal:10,fontSize:18,color:'white'}}>{subcription}</Text>
                    </View>

                </View>
                <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
                <LinearGradient  start={{x: 0.4, y: 0.1}} end={{x: 0.5, y: 1}}
   colors={['#1565C0','#b92b27']} style={{marginTop:50,width:'90%',height:250,borderRadius:15,justifyContent:'space-around'}} >


                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginHorizontal:10}}>
                            <Text style={{paddingHorizontal:10,fontSize:20,color:'white',fontWeight:'bold',fontFamily: "PermanentMarker-Regular"}}>Try Premium for 1 month</Text>
                            </View>
                            <Text style={{width:'90%',alignSelf:'center',color:'white',fontFamily: "PermanentMarker-Regular"}}>Upgrade to Premium to unlock all visualisation tracks!</Text>
                        <TouchableOpacity onPress={()=>trailPlanSubcription()} style={{width:'80%',backgroundColor:'white',height:40,alignSelf:'center',justifyContent:'center',borderRadius:10}}>
                            <Text style={{paddingHorizontal:10,fontSize:20,fontWeight:'bold',alignSelf:'center',fontFamily: "PermanentMarker-Regular"}}>Try 1 month free</Text>
                        </TouchableOpacity>
                </LinearGradient>
                </View>
                <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
                <LinearGradient start={{x: 0.4, y: 0.5}} end={{x: 0.5, y: 1}} colors={['#00C9FF','#92FE9D']} style={{marginTop:50,width:'90%',height:250,borderRadius:15,justifyContent:'space-around',marginBottom:80}} >
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginHorizontal:10}}>
                            <Text style={{paddingHorizontal:10,fontSize:20,color:'white',fontWeight:'bold',fontFamily: "PermanentMarker-Regular"}}>Premium for Rs.200/month</Text>
                            </View>
                            <Text style={{width:'90%',alignSelf:'center',color:'white',fontFamily: "PermanentMarker-Regular"}}>Upgrade to Premium to unlock all visualisation tracks!</Text>
                        <TouchableOpacity onPress={()=>processInfo()} style={{justifyContent:'center',width:'80%',backgroundColor:'white',height:40,alignSelf:'center',borderRadius:10}}>
                            <Text style={{paddingHorizontal:10,fontFamily: "PermanentMarker-Regular",fontSize:20,fontWeight:'bold',alignSelf:'center'}}>Buy Premium Now</Text>
                        </TouchableOpacity>
                </LinearGradient>
                
                </View>
                </ScrollView>
                <Tabbar click={() => props.navigation.navigate('Home')} click4={()=> props.navigation.navigate('Blogs')} click2={() => props.navigation.navigate('Profile')} click3={()=> props.navigation.navigate('Premium')} />
            </View>

      )
}

export default Premium

