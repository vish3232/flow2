import React, { useState,useEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import constant from '../constant/constant'
import Logo from '../assets/flow home logo.svg'
import Axios from 'axios'



const Header = () => {
    const [queote,setQueote]=useState(null)

    useEffect(() => {
        getHomeQueote()
    }, [])

    const getHomeQueote=async()=>{
        Axios.get('http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:8080/phrases/getPhrases').then(res => {
            setQueote(res.data.phrasesData[0].phrase)
        }).catch(err => console.log(err))
    }

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
            <Text style={{ width:215,color: constant.white, fontSize: 25, marginLeft: 20, marginTop: 40,fontFamily: "PermanentMarker-Regular" }}>{queote}</Text>
         </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 250,
        backgroundColor: '#28287B',
        width: '100%',
        alignSelf: 'center',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        elevation: 30
    },
    logo: {
        position: 'absolute',
        right: 0,
        top: 10
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
        opacity: 0.5,
        fontFamily: "PermanentMarker-Regular"
    }
})

export default Header
