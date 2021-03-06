import React, { useState,useEffect,useContext } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import DeviceInfo from 'react-native-device-info';
import Axios from 'axios'
import constant from '../constant/constant'
import Auth from '../assets/Authentication'
import Modal from './Modal';
import { saveEmail, saveMobile, saveName, saveUserName, saveUserState, savePaymentStatus } from '../constant/storage'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage'
import LoadingScreen from '../Screens/LoadingScreen'

const SignUpScreen = (props) => {

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['email', 'profile'],
            webClientId: '313121356610-r8qa4eq58flevcdap1l86iuuo1mn6bl9.apps.googleusercontent.com',
        });
    }, [])


    const [username, setusername] = useState('')
    const [mobile, setmobile] = useState('')
    const [password, setpassword] = useState('')
    const [email, setemail] = useState('')
    const [see, setsee] = useState(false)
    const [name, setname] = useState('')
    const [isLoading,setLoading]=useState(false)



    const submit = async () => {
        setLoading(true)
        let deviceId = DeviceInfo.getDeviceId();
        if (username === "") {
            alert('Enter Name')
            setLoading(false)
        } else if (mobile === "") {
            alert('Enter Mobile No')
            setLoading(false)
        } else if (email === "") {
            alert('Enter Email')
            setLoading(false)
        } else if (password === "") {
            alert('Enter Password')
            setLoading(false)
        } else {
            Axios.post(constant.url + '/user/signup', {
                name: username,
                fullname: name,
                mobile: mobile,
                email: email,
                password: password,
                deviceId: deviceId,
                planId:'603f3991ef0802ca34788323',
                timeStamp:new Date(),
                destination:null,
                filename:null,
                download:null
            }).then(data => {
                if (data.status === 201 && data.data.message === 'User Created') {
                    setLoading(false)
                    global.userId=res.data.userData._id
                           
                    signIn(data.data.token)
                    saveUserName(JSON.stringify(data.data.userData.name))
                    saveName(JSON.stringify(data.data.userData.fullname))
                    saveMobile(JSON.stringify(data.data.userData.mobile))
                    saveEmail(JSON.stringify(data.data.userData.email))
                    savePaymentStatus(JSON.stringify(data.data.userData.paymentStatus))
                    const userState = 1
                    saveUserState(JSON.stringify(userState))
                    setsee(true)
                    Axios.get(constant.url + `/emailOtp/send?to=${email}`).then(data => {
                        
                        props.navigation.navigate('Modal',{
                            isForgotPassword:'false',
                            email:email
                        });

                    })

                } else {
                    alert('this device has already account register')
                    setLoading(false)
                //    props.navigation.navigate('Home');


                }
            }).catch(err => {
                console.log("error" + err)
                setLoading(false)
            })
        }
    }

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


    const signIn = async (token) => {
        await AsyncStorage.setItem('userToken', token);
    }

    const toggle = () => {
        setLoading(!isLoading);
      };


    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <LoadingScreen toggle={toggle} modalVisible={isLoading} />
            <Image source={require('../assets/waves.png')} style={styles.logo} />
            <Text style={{ fontFamily: "PermanentMarker-Regular", alignSelf: 'center', marginTop: 10, fontSize: 30, color: "#dcdcdc" }}>Welcome To Flow</Text>
            <View style={{ width: '80%', alignSelf: 'center', marginTop: '8%' }}>
                <Text style={{ color: constant.white }}>User Name</Text>
                <TextInput style={styles.input}
                    placeholder="Enter User Name"
                    onChangeText={(value) => setusername(value)} />
            </View>
            <View style={{ width: '80%', alignSelf: 'center', marginTop: 10 }}>
                <Text style={{ color: constant.white }}>Full Name</Text>
                <TextInput style={styles.input}
                    placeholder="Enter Full Name"
                    onChangeText={(value) => setname(value)} />
            </View>

            <View style={{ width: '80%', alignSelf: 'center', marginTop: 10 }}>
                <Text style={{ color: constant.white }}>Mobile Number</Text>
                <TextInput style={styles.input}
                    placeholder="Enter Mobile Number"
                    keyboardType="numeric"
                    maxLength={10}
                    onChangeText={(value) => setmobile(value)} />
            </View>
            <View style={{ width: '80%', alignSelf: 'center', marginTop: 10 }}>
                <Text style={{ color: constant.white }}>Email</Text>
                <TextInput style={styles.input}
                    placeholder="Enter Email"
                    keyboardType="email-address"
                    onChangeText={(value) => setemail(value)} />
            </View>
            <View style={{ width: '80%', alignSelf: 'center', marginTop: 10 }}>
                <Text style={{ color: constant.white }}>Password</Text>
                <TextInput style={styles.input}
                    placeholder="Enter password"
                    secureTextEntry={true}
                    onChangeText={(value) => setpassword(value)} />
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
                <Text style={{ fontSize: 10, color: '#fff' }}>By creating an account your ageering to our</Text>
                <TouchableOpacity>
                    <Text style={{ fontSize: 10, color: '#fff', fontWeight: 'bold', marginLeft: 5 }}>Terms of services</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={()=>submit()} >
                <Text style={{ fontWeight: 'bold', color: '#fff' }}>Sign Up</Text>
            </TouchableOpacity>
            <GoogleSigninButton
                    style={{ width: '55%', height: 50, marginTop: 40, alignSelf: 'center' }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={_signIn}
                />
                
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, marginBottom:20 }}>
                <Text style={{ color: constant.white }}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('SignInScreen')}>
                    <Text style={{ color: constant.blue, marginLeft: 10 }}>Sign In</Text>
                </TouchableOpacity>
            </View>
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
        height: 45,
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
    logo: {
        width: 95,
        height: 41,
        marginTop: 30,
        alignSelf: 'center'
    }
})


export default SignUpScreen
