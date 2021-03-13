import React from 'react'
import { TouchableOpacity, Text, Image, View } from 'react-native'
import constant from '../constant/constant'

const Card2 = (props) => {
    return (
        <TouchableOpacity style={{ height: 50, flexDirection: 'row', alignItems: 'center', marginHorizontal:20, borderBottomColor: 'black', borderBottomWidth: 0.5 }} onPress={props.click}>
            <View style={{marginLeft:20}}>
                <Text style={{ color:'black',fontFamily: "PermanentMarker-Regular",fontSize:15 }}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Card2
