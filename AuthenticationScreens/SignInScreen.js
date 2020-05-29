import React, { useState,useEffect } from 'react'
import { View,BackHandler ,Text, TextInput, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import DeviceInfo from 'react-native-device-info';
import Axios from 'axios';
import jwt from 'jwt-decode'
import constant from '../constant/constant'
import {saveEmail,saveMobile,savePaymentStatus,saveUserName,saveName,saveUserState} from '../constant/storage'


const SignInScreen = (props) => {

    useEffect(() => {
          BackHandler.addEventListener('hardwareBackPress', handleBackButton);
          return () => {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
           
        }
 
    }, [])

    const  handleBackButton = () => {
        BackHandler.exitApp()
           } 
       

    const [name, setname] = useState('')
    const [password, setpassword] = useState('')


    const submit = () => {
        let deviceId = DeviceInfo.getDeviceId();
        if (name === "") {
            alert('Enter Name')
        } else if (password === "") {
            alert('Enter Password')
        } else {
            Axios.post(constant.url + '/user/signin', {
                name: name,
                password: password
            }).then(res => {
                if (res.status === 200) {
                    var decoded = jwt(res.data.token);
                    if (deviceId != decoded.deviceId) {
                        alert('You cannot use your account in other device')
                    } else {
                        signIn(res.data.token)
                        saveUserName(JSON.stringify (res.data.userData.name))
                        saveName(JSON.stringify (res.data.userData.fullname))
                        saveMobile(JSON.stringify (res.data.userData.mobile))
                        saveEmail(JSON.stringify (res.data.userData.email))
                        savePaymentStatus(JSON.stringify (res.data.userData.paymentStatus))
                        const userState=1
                        saveUserState(JSON.stringify(userState))
                      

                    }
                }
            }).catch(error => {
                //alert('Password or UserName is incorrect')
            })
        }
    }

    const signIn = async (token) => {
        await AsyncStorage.setItem('userToken', token);
        props.navigation.navigate('Home');
    }
    return (
        <View style={styles.container}>
            <Text style={{ fontFamily: "PermanentMarker-Regular", alignSelf: 'center', marginBottom: 50, fontSize: 50, color: constant.blue, letterSpacing: 10 }}>Log In</Text>
            <View style={{ marginHorizontal: '10%' }}>
                <Text style={{ color: constant.white }}>User Name</Text>
                <TextInput style={styles.input} onChangeText={(value) => setname(value)} />
            </View>
            <View style={{ marginHorizontal: '10%', marginTop: 10 }}>
                <Text style={{ color: constant.white }}>Password</Text>
                <TextInput style={styles.input} secureTextEntry={true} onChangeText={(value) => setpassword(value)} />
            </View>
                <TouchableOpacity style={[styles.button, { marginRight: 20 }]} onPress={submit}>
                    <Text>LOG IN</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row',justifyContent:'center',marginTop:25}}>
                <Text style={{color:constant.white}}>Not Yet Register</Text>
                <TouchableOpacity onPress={()=>props.navigation.navigate('SignUpScreen')}>
                    <Text style={{color:constant.blue,marginLeft:10,textDecorationLine:'underline'}}>SIGN UP</Text>
                </TouchableOpacity>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constant.background,
        justifyContent:'center'
    },
    input: {
        width: '100%',
        height: 50,
        minHeight:40,
        borderRadius: 10,
        marginTop: 5,
        backgroundColor: 'white',
        alignSelf: 'center',
        elevation: 10
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 50,
        minHeight:40,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: '#fff',
        elevation: 10,
        marginTop: 25

    },

})


export default SignInScreen
