import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, AsyncStorage, Image, ScrollView } from 'react-native'
import DeviceInfo from 'react-native-device-info';
import Axios from 'axios'
import constant from '../constant/constant'
import Auth from '../assets/Authentication'
import Modal from './Modal';
import { saveEmail, saveMobile, saveName, saveUserName, saveUserState, savePaymentStatus } from '../constant/storage'


const SignUpScreen = (props) => {

    const [username, setusername] = useState('')
    const [mobile, setmobile] = useState('')
    const [password, setpassword] = useState('')
    const [email, setemail] = useState('')
    const [see, setsee] = useState(false)
    const [name, setname] = useState('')



    const submit = async () => {
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
            Axios.post(constant.url + '/user/signup', {
                name: username,
                fullname: name,
                mobile: mobile,
                email: email,
                password: password,
                deviceId: deviceId,
                paymentStatus: "Free"
            }).then(data => {
                if (data.status === 201 && data.data.message === 'User Created') {
                    signIn(data.data.token)
                    saveUserName(JSON.stringify(data.data.userData.name))
                    saveName(JSON.stringify(data.data.userData.fullname))
                    saveMobile(JSON.stringify(data.data.userData.mobile))
                    saveEmail(JSON.stringify(data.data.userData.email))
                    savePaymentStatus(JSON.stringify(data.data.userData.paymentStatus))
                    const userState = 1
                    saveUserState(JSON.stringify(userState))
                    setsee(true)
                    Axios.post(constant.url + '/twilio/sendOtp', {
                        mobileNo: mobile,
                    }).then(data => {
                        console.log(data)
                        props.navigation.navigate('Modal');

                    })

                } else {
                    alert('this device has already account register')

                    props.navigation.navigate('Home');


                }
            }).catch(err => {
                console.log("error" + err)
            })
        }
    }



    const signIn = async (token) => {
        await AsyncStorage.setItem('userToken', token);
    }


    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
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
                    onChangeText={(value) => setmobile(value)} />
            </View>
            <View style={{ width: '80%', alignSelf: 'center', marginTop: 10 }}>
                <Text style={{ color: constant.white }}>Email</Text>
                <TextInput style={styles.input}
                    placeholder="Enter Email"
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
            <TouchableOpacity style={styles.button} /*onPress={submit}*/ onPress={()=> props.navigation.navigate("Modal")}>
                <Text style={{ fontWeight: 'bold', color: '#fff' }}>Sign Up</Text>
            </TouchableOpacity>
            <View style={{ width: '90%', backgroundColor: '#dcdcdc', height: 0.5, alignSelf: 'center', marginTop: 20 }} />
            <TouchableOpacity style={{ width: '50%', height: 40, backgroundColor: '#dcdcdc', marginTop: 30, alignSelf: 'center' }} />
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
