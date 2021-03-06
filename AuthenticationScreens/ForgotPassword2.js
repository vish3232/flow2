import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import constant from '../constant/constant'
import Axios from 'axios'
import {getEmail} from '../constant/storage'
import LoadingScreen from '../Screens/LoadingScreen'
const ForgotPassword2 = (props) => {

    const [newPassword, setnewPassword] = useState(null)
    const [conformPassword, setconformPassword] = useState(null)
    const [isLoading,setLoading]=useState(false)

    const updatePassword=async()=>{
        setLoading(true)
        if(newPassword===conformPassword){
        getEmail().then((mail) => {

          
        Axios.post(constant.url + `/user/ForgotPassword`,{
            email: JSON.parse(mail),
            password:newPassword
        }).then(data => {
            console.log(data)
            if(data.data.message==="Password Changed..."){  
                setLoading(false)   
            props.navigation.navigate('SignInScreen');
            }else{
                setLoading(false)
                alert(data.data.message)
            }

        })
    })
    }else{
        setLoading(false)
        alert("please enter same password")
    }
    }
    const toggle = () => {
        setLoading(!isLoading);
      };

    return (
        <View style={styles.container}>
        <LoadingScreen toggle={toggle} modalVisible={isLoading} />
            <ScrollView>
                <Image source={require('../assets/waves.png')} style={styles.logo} />
                <Text style={{ letterSpacing: 2, fontWeight: 'bold', fontFamily: "PermanentMarker-Regular", alignSelf: 'center', marginTop: 40, fontSize: 30, color: "#dcdcdc" }}>Forgot Password</Text>
                <View style={{ width: '80%', alignSelf: 'center', marginTop: 30 }}>
                    <Text style={{ color: constant.white }}>New Password</Text>
                    <TextInput style={styles.input}
                        placeholder="Enter New Password"
                        onChangeText={(value) => setnewPassword(value)} secureTextEntry={true} />
                </View>
                <View style={{ width: '80%', alignSelf: 'center', marginTop: 20 }}>
                    <Text style={{ color: constant.white }}>Conform Password</Text>
                    <TextInput style={styles.input}
                        placeholder="Enter Conform Password"
                        onChangeText={(value) => setconformPassword(value)} secureTextEntry={true} />
                </View>
                <TouchableOpacity onPress={() => updatePassword()} style={styles.button}>
                    <Text style={{ fontWeight: 'bold' }} >Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default ForgotPassword2

const styles = StyleSheet.create({
    container: {
        backgroundColor: constant.background,
        flex: 1
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
        marginTop: 30,
        borderRadius: 5
    }
})
