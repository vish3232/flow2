import React,{useState} from 'react'
import { View, Text, Modal, TextInput,TouchableOpacity } from 'react-native'
import constant from '../constant/constant'
import Axios from 'axios';
import {getMobile} from '../constant/storage'
const Modal1 = (props) => {
    const [otp1,setotp1]=useState('');
    const [otp2,setotp2]=useState('');
    const [otp3,setotp3]=useState('');
    const [otp4,setotp4]=useState('');
    const [otp5,setotp5]=useState('');
    const [otp6,setotp6]=useState('');
    const verifyOtp=()=>{
        //alert(JSON.stringify(props))
        const totp=otp1+otp2+otp3+otp4+otp5+otp6
        console.log(totp)
        Axios.post(constant.url+'/twilio/verifyOtp',{
            totp:totp,
         }).then(data=>{
             //alert(JSON.stringify (data))
            if(data.data==="verify successfully"){
                
                props.navigation.navigate('Home');
               
    
            }else{
                alert('Please Enter Valid Otp...')
            }
          })
   
    }

    const resendOtp=()=>{
        getMobile().then((mobileno) => {
            Axios.post(constant.url+'/twilio/sendOtp',{
                mobileNo:mobileno,
             }).then(data=>{
               console.log(data)
              })
       
            
          });

        
    }
    return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: constant.background, height: '100%' }}>
                <View style={{ height: '70%', width: '85%', backgroundColor: constant.blue, borderRadius: 100 }}>
                    <Text style={{ marginTop: 50, letterSpacing: 5, alignSelf: 'center', color: constant.white, fontFamily: 'PermanentMarker-Regular', fontSize: 25 }}>ENTER OTP</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 100 }}>
                        <TextInput onChangeText={(Value)=>setotp1(Value)} style={{ backgroundColor: 'white', height: 50, width: 40, borderRadius: 10 }} />
                        <TextInput onChangeText={(Value)=>setotp2(Value)} style={{ backgroundColor: 'white', height: 50, width: 40, borderRadius: 10 }} />
                        <TextInput onChangeText={(Value)=>setotp3(Value)} style={{ backgroundColor: 'white', height: 50, width: 40, borderRadius: 10 }} />
                        <TextInput onChangeText={(Value)=>setotp4(Value)} style={{ backgroundColor: 'white', height: 50, width: 40, borderRadius: 10 }} />
                        <TextInput onChangeText={(Value)=>setotp5(Value)} style={{ backgroundColor: 'white', height: 50, width: 40, borderRadius: 10 }} />
                        <TextInput onChangeText={(Value)=>setotp6(Value)} style={{ backgroundColor: 'white', height: 50, width: 40, borderRadius: 10 }} />
             
                    </View>
                    <TouchableOpacity onPress={verifyOtp} style={{ height: 50, width: '50%', backgroundColor: 'white', alignSelf: 'center', position: 'absolute', bottom: '25%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{fontWeight: 'bold' }}>Verify</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={resendOtp} style={{ height: 50, width: '50%', backgroundColor: 'white', alignSelf: 'center', position: 'absolute', bottom: '12%', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>Resend OTP</Text>
                    </TouchableOpacity>
                </View>
            </View>

    )
}

export default Modal1
