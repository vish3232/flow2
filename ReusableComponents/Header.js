import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import constant from '../constant/constant'
import Logo from '../assets/4.svg'



const Header = () => {

    const [day] = useState(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
    const [month] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augest', 'September', 'October', 'November', 'December'])

    return (
        <View style={styles.container}>
            <Logo height={260} width={200} style={styles.logo} />
            <View style={styles.dateContainer}>
                <Text style={styles.dateformat}>{day[new Date().getDay()]},</Text>
                <Text style={{ marginLeft: 5, ...styles.dateformat }}>{month[new Date().getMonth()]}</Text>
                <Text style={{ marginLeft: 5, ...styles.dateformat }}>{new Date().getDate()}</Text>
            </View>
            <Text style={{ color: constant.white, fontSize: 25, marginLeft: 20, marginTop: 40 }}>Love And Accept</Text>
            <Text style={{ color: constant.white, fontSize: 25, marginLeft: 20 }}>Yourself</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 250,
        backgroundColor: constant.blue,
        width: '100%',
        alignSelf: 'center',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        elevation: 30
    },
    logo: {
        position: 'absolute',
        right: 20,
        top: 0
    },
    dateContainer: {
        flexDirection: 'row',
        marginLeft: 20,
        position: 'absolute',
        top: 20
    },
    dateformat: {
        color: '#fff',
        fontSize: 12,
        opacity: 0.5
    }
})

export default Header
