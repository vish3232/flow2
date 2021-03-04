import React, { useState, useContext, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import DeviceInfo from 'react-native-device-info';
import Axios from 'axios';
import jwt from 'jwt-decode'
import constant from '../constant/constant'
import { UserContext } from '../AuthContext'
import { saveEmail, saveMobile, savePaymentStatus, saveUserName, saveName, saveUserState } from '../constant/storage'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage'
const SignInScreen = (props) => {

    const [name, setname] = useState('')
    const [password, setpassword] = useState('')
    const { logIn } = useContext(UserContext)

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['email', 'profile'],
            webClientId: '313121356610-r8qa4eq58flevcdap1l86iuuo1mn6bl9.apps.googleusercontent.com',
        });
    }, [])

    const _signIn = async () => {
        // It will prompt google Signin Widget
        try {
          await GoogleSignin.hasPlayServices({
            // Check if device has Google Play Services installed
            // Always resolves to true on iOS
            showPlayServicesUpdateDialog: true,
          });
          const userInfo = await GoogleSignin.signIn();
          console.log('User Info --> ', userInfo);
          setUserInfo(userInfo);
        } catch (error) {
          console.log('Message', JSON.stringify(error));
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            alert('User Cancelled the Login Flow');
          } else if (error.code === statusCodes.IN_PROGRESS) {
            alert('Signing In');
          } else if (
              error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
            ) {
            alert('Play Services Not Available or Outdated');
          } else {
            alert(error.message);
          }
        }
      };


    const submit = async () => {
        try {
            let deviceId = DeviceInfo.getDeviceId();
            if (name === "") {
                alert('Enter Name')
            } else if (password === "") {
                alert('Enter Password')
            } else {
                const res = await Axios.post(constant.url + '/user/signin', {
                    email: name,
                    password: password
                })
                if (res.status === 200) {
                    var decoded = jwt(res.data.token);
                    if (deviceId != decoded.deviceId) {
                        alert('You cannot use your account in other device')
                    } else {
                        signIn(res.data.token)
                        saveUserName(JSON.stringify(res.data.userData.name))
                        saveName(JSON.stringify(res.data.userData.fullname))
                        saveMobile(JSON.stringify(res.data.userData.mobile))
                        saveEmail(JSON.stringify(res.data.userData.email))
                        savePaymentStatus(JSON.stringify(res.data.plan_name))
                        logIn()
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const signIn = async (token) => {
        console.log(token)
        await AsyncStorage.setItem('userToken', token);
    }
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image source={require('../assets/waves.png')} style={styles.logo} />
                <Text style={{ fontFamily: "PermanentMarker-Regular", alignSelf: 'center', marginTop: 10, fontSize: 30, color: "#dcdcdc" }}>Welcome To Flow</Text>
                <View style={{ width: '80%', alignSelf: 'center', marginTop: '8%' }}>
                    <Text style={{ color: '#dcdcdc' }}>Email</Text>
                    <TextInput style={styles.input}
                        placeholder="Enter Email"
                        onChangeText={(value) => setname(value)} />
                </View>
                <View style={{ width: '80%', alignSelf: 'center', marginTop: 20 }}>
                    <Text style={{ color: '#dcdcdc' }}>Password</Text>
                    <TextInput style={styles.input}
                        placeholder="Enter Password"
                        secureTextEntry={true}
                        onChangeText={(value) => setpassword(value)} />
                </View>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('ForgotPassword')}
                    style={{ alignSelf: 'flex-end', marginRight: '10%', marginTop: 10 }}>
                    <Text style={{ color: '#dcdcdc' }}>Forgot Password ?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { marginRight: 20 }]} onPress={submit}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 16 }}>Sign In</Text>
                </TouchableOpacity>
                <View style={{ width: '90%', backgroundColor: '#dcdcdc', height: 0.5, alignSelf: 'center', marginTop: 25 }} />
                <GoogleSigninButton
                    style={{ width: '55%', height: 50, marginTop: 40, alignSelf: 'center' }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={_signIn}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25 }}>
                    <Text style={{ color: constant.white }}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('SignUpScreen')}>
                        <Text style={{ color: constant.blue, marginLeft: 10 }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constant.background,
    },
    logo: {
        width: 95,
        height: 41,
        marginTop: 40,
        alignSelf: 'center'
    },
    input: {
        width: '100%',
        height: 50,
        minHeight: 40,
        borderRadius: 10,
        marginTop: 5,
        backgroundColor: 'white',
        alignSelf: 'center',
        elevation: 10,
        paddingHorizontal: 10
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 130,
        height: 40,
        minHeight: 40,
        borderRadius: 20,
        alignSelf: 'center',
        backgroundColor: 'red',
        elevation: 10,
        marginTop: 25
    },
})


export default SignInScreen
