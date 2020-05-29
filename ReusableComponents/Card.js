import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'
import Heart from '../assets/1.svg'
import Logo from '../assets/card.svg'

const Card = (props) => {
    const { height, width } = Dimensions.get('window')
    return (
        <TouchableOpacity style={{ ...styles.container, ...props.style, width: width - 40, elevation:5 }} onPress={props.click}>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>{props.title}</Text>
            <Text style={{ width: 150, color: '#fcfcfc', marginTop: 5 }}>Turn Down The Stress Volume</Text>
            <Heart height={200} width={200} style={{ position: 'absolute', bottom: -125 }} />
            <Logo height={150} width={150} style={{ position: 'absolute', right: 20, top: 20 }} />
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
