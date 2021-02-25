import React, { useState } from 'react'
import { View, Text, Modal, TextInput, TouchableOpacity } from 'react-native'
import constant from '../constant/constant'
import Axios from 'axios';
import { getMobile } from '../constant/storage'
const Modal1 = (props) => {
    const [otp1, setotp1] = useState('');
    const [otp2, setotp2] = useState('');
    const [otp3, setotp3] = useState('');
    const [otp4, setotp4] = useState('');
    const [otp5, setotp5] = useState('');
    const [otp6, setotp6] = useState('');
    const verifyOtp = () => {
        //alert(JSON.stringify(props))
        const totp = otp1 + otp2 + otp3 + otp4 
        Axios.get(constant.url + `/emailOtp//verify?id=${totp}`).then(data => {
           // alert(JSON.stringify (data.data.message))
            if (data.data.message === "user verified") {

                props.navigation.navigate('Home');


            } else {
                alert('Please Enter Valid Otp...')
            }
        })

    }

    const resendOtp = () => {
        getMobile().then((mobileno) => {
            Axios.post(constant.url + '/twilio/sendOtp', {
                mobileNo: mobileno,
            }).then(data => {
                console.log(data)
            })
        });


    }
    return (
        <View style={{ flex: 1, backgroundColor: constant.background }}>
            <View style={{ marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff' }}>OTP has been send to your email</Text>
                <Text style={{ color: '#fff' }}>vishalpurane59@gmail.com</Text>
            </View>
            <Text style={{ marginTop: 30, letterSpacing: 2, alignSelf: 'center', color: constant.white, fontFamily: 'PermanentMarker-Regular', fontSize: 25, fontWeight: 'bold' }}>ENTER OTP</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 }}>
                <TextInput onChangeText={(Value) => setotp1(Value)} style={{ backgroundColor: 'white', height: 50, width: '15%', borderRadius: 10 }} />
                <TextInput onChangeText={(Value) => setotp2(Value)} style={{ backgroundColor: 'white', height: 50, width: '15%', borderRadius: 10 }} />
                <TextInput onChangeText={(Value) => setotp3(Value)} style={{ backgroundColor: 'white', height: 50, width: '15%', borderRadius: 10 }} />
                <TextInput onChangeText={(Value) => setotp4(Value)} style={{ backgroundColor: 'white', height: 50, width: '15%', borderRadius: 10 }} />
            </View>
            <TouchableOpacity onPress={verifyOtp} style={{ height: 50, width: '50%', backgroundColor: 'white', alignSelf: 'center', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                <Text style={{ fontWeight: 'bold' }}>Verify</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resendOtp} style={{ height: 50, width: '50%', backgroundColor: '#828282', alignSelf: 'center', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                <Text style={{ fontWeight: 'bold' }}>Resend OTP</Text>
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Text style={{ color: '#fff' }}>resend OTP in next 1 minute...</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: '#fff' }}>In case of wrong email </Text>
                    <TouchableOpacity>
                        <Text style={{ color: '#fff', textDecorationLine: 'underline' }}>Click Here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )
}

export default Modal1
