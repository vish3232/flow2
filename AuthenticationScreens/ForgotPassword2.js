import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import constant from '../constant/constant'

const ForgotPassword2 = () => {

    const [newPassword, setnewPassword] = useState(null)
    const [conformPassword, setconformPassword] = useState(null)

    return (
        <View style={styles.container}>
            <ScrollView>
                <Image source={require('../assets/waves.png')} style={styles.logo} />
                <Text style={{ letterSpacing: 2, fontWeight: 'bold', fontFamily: "PermanentMarker-Regular", alignSelf: 'center', marginTop: 40, fontSize: 30, color: "#dcdcdc" }}>Forgot Password</Text>
                <View style={{ width: '80%', alignSelf: 'center', marginTop: 30 }}>
                    <Text style={{ color: constant.white }}>New Password</Text>
                    <TextInput style={styles.input}
                        placeholder="Enter New Password"
                        onChangeText={(value) => setnewPassword(value)} />
                </View>
                <View style={{ width: '80%', alignSelf: 'center', marginTop: 20 }}>
                    <Text style={{ color: constant.white }}>Conform Password</Text>
                    <TextInput style={styles.input}
                        placeholder="Enter Conform Password"
                        onChangeText={(value) => setconformPassword(value)} />
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={{ fontWeight: 'bold' }} onPress={() => props.navigation.navigate('ForgotPassword2')}>Submit</Text>
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
