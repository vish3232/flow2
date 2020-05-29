import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, AsyncStorage, Dimensions, ScrollView } from 'react-native'
import DeviceInfo from 'react-native-device-info';
import Axios from 'axios'
import constant from '../constant/constant'
import Auth from '../assets/Authentication'
import Modal from './Modal';
import {saveEmail,saveMobile,saveName,saveUserName,saveUserState, savePaymentStatus} from '../constant/storage'


const SignUpScreen = (props) => {

    const [username, setusername] = useState('')
    const [mobile, setmobile] = useState('')
    const [password, setpassword] = useState('')
    const [email, setemail] = useState('')
    const [see, setsee] = useState(false)
    const [name,setname]=useState('')



    const submit = async() => {
        let deviceId = DeviceInfo.getDeviceId();
        if (username === "") {
            alert('Enter Name')
        } else if (mobile === "") {
            alert('Enter Mobile No')
        } else if (email === "") {
            alert('Enter Email')
        } else if (password === "") {
            alert('Enter Password')
        } else {
            Axios.post(constant.url+'/user/signup',{
                name:username,
                fullname:name,
                mobile:mobile,
                email:email,
                password:password,
                deviceId:deviceId,
                paymentStatus:"Free"
            }).then(data=>{
            if(data.status === 201 && data.data.message === 'User Created' )
              {     
                  signIn(data.data.token)
                  saveUserName(JSON.stringify (data.data.userData.name))
                  saveName(JSON.stringify (data.data.userData.fullname))
                  saveMobile(JSON.stringify (data.data.userData.mobile))
                  saveEmail(JSON.stringify (data.data.userData.email))
                  savePaymentStatus(JSON.stringify (data.data.userData.paymentStatus))
                  const userState=1
                  saveUserState(JSON.stringify(userState))
                  setsee(true)
                  Axios.post(constant.url+'/twilio/sendOtp',{
                    mobileNo:mobile,
                 }).then(data=>{
                    console.log(data)
                    props.navigation.navigate('Modal');
                
                  })
                   
              }else{
                  alert('this device has already account register')
                 
                  props.navigation.navigate('Home');
                
           
              }
            }).catch(err=>{
                console.log("error"+err)
            })
        }
    }



    const signIn = async (token) => {
        await AsyncStorage.setItem('userToken', token);
        }

    const { width, height } = Dimensions.get('window')


    return (
        <ScrollView style={styles.container} contentContainerStyle={{justifyContent: 'center', flexGrow:1}}>
            <Auth height={width / 2.2} width={height / 2.2} style={{ alignSelf: 'center' }} />
            <Text style={{ fontFamily: "PermanentMarker-Regular", alignSelf: 'center', marginBottom: 50, fontSize: 50, color: constant.blue, letterSpacing: 10 }}>Sign up</Text>
            <View style={{ marginHorizontal: '10%' }}>
                <Text style={{ color: constant.white }}>User Name</Text>
                <TextInput style={styles.input} onChangeText={(value) => setusername(value)} />
            </View>
            <View style={{ marginHorizontal: '10%', marginTop: 10 }}>
                <Text style={{ color: constant.white }}>Full Name</Text>
                <TextInput style={styles.input} onChangeText={(value) => setname(value)} />
            </View>
           
            <View style={{ marginHorizontal: '10%', marginTop: 10 }}>
                <Text style={{ color: constant.white }}>Mobile No</Text>
                <TextInput style={styles.input} onChangeText={(value) => setmobile(value)} />
            </View>
            <View style={{ marginHorizontal: '10%', marginTop: 10 }}>
                <Text style={{ color: constant.white }}>Email</Text>
                <TextInput style={styles.input} onChangeText={(value) => setemail(value)} />
            </View>
            <View style={{ marginHorizontal: '10%', marginTop: 10 }}>
                <Text style={{ color: constant.white }}>Password</Text>
                <TextInput style={styles.input} secureTextEntry={true} onChangeText={(value) => setpassword(value)} />
            </View>
            <TouchableOpacity style={styles.button} onPress={submit}>
                <Text>SUBMIT</Text>
            </TouchableOpacity>

           
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constant.background,
    },
    input: {
        width: '100%',
        minHeight: 40,
        height: 50,
        borderRadius: 10,
        marginTop: 5,
        backgroundColor: 'white',
        alignSelf: 'center',
        elevation: 10
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 50,
        minHeight: 40,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: '#fff',
        elevation: 10,
        marginTop: 25
    }

})


export default SignUpScreen
