import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Dimensions,Image } from 'react-native'
import Heart from '../assets/1.svg'
import Logo from '../assets/card.svg'
import LinearGradient from 'react-native-linear-gradient';

const Card = (props) => {
    const { height, width } = Dimensions.get('window')
    return (
        <TouchableOpacity onPress={props.click}>
         <LinearGradient  start={{x: 0.4, y: 0.5}} end={{x: 0.5, y: 1}}
   colors={['#b92b27','#1565C0']} style={{ ...styles.container, ...props.style, width: width - 40, elevation:5 }} >
            <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold',width:'55%',fontFamily: "PermanentMarker-Regular" }}>{props.title}</Text>
            <Text style={{ width: 150, color: '#fcfcfc', marginTop: 5,fontFamily: "PermanentMarker-Regular",fontSize:12 }}>{props.description}</Text>
            <Image resizeMode="cover" style={{ top:10,height: 160,right:20,width:120,position:"absolute",borderRadius:15 }} source={props.source}></Image>
         
           </LinearGradient>
           </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 180,
        backgroundColor: '#efdc04',
        padding: 20,
        overflow: 'hidden',
        borderRadius: 12,
    }
})


export default Card
