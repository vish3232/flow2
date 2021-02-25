import React,{useState} from 'react'
import { ScrollView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import constant from '../constant/constant'
import Axios from 'axios'

const ForgotPassword = (props) => {
    const [email,setEmail]=useState(null)
    const  forgotPassword =async()=>{
        Axios.get(constant.url + `/emailOtp/send?to=${email}`).then(data => {
            console.log(data)
                        
            props.navigation.navigate('Modal',{
                isForgotPassword:'true'
            });

        })
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <Image source={require('../assets/waves.png')} style={styles.logo} />
                <Text style={{ fontFamily: "PermanentMarker-Regular", alignSelf: 'center', marginTop: 10, fontSize: 30, color: "#dcdcdc" }}>Forgot Password</Text>
                <Text style={{ width: '80%', alignSelf: 'center', color: '#dcdcdc', fontSize: 16, marginTop: 20 }}>
                    Enter your Email address registered with us, We will send you a reset password link
                </Text>
                <View style={{ width: '80%', alignSelf: 'center', marginTop: 30 }}>
                    <Text style={{ color: constant.white }}>Email</Text>
                    <TextInput style={styles.input}
                        placeholder="Enter your email address"
                        onChangeText={(value) => setEmail(value)} />
                </View>
                <TouchableOpacity onPress={()=>forgotPassword()} style={styles.button}>
                    <Text style={{ fontWeight: 'bold' }} >Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constant.background
    },
    logo: {
        width: 95,
        height: 41,
        marginTop: 30,
        alignSelf: 'center'
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
        alignSelf: 'center',
        height: 40,
        width: 100,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 5
    }
})
