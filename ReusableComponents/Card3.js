import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import constant from '../constant/constant'


const Card3 = (props) => {
    return (
        <TouchableOpacity style={{ height: 50, justifyContent: 'space-between', marginHorizontal: 20, marginTop: 15,marginBottom:5, flexDirection: "row", alignItems: 'center',borderBottomColor: 'black', borderBottomWidth: 0.5 }} onPress={props.click}>
            <View>
                <Text style={{ color: 'black', fontSize:16,fontFamily: "PermanentMarker-Regular" }}>{props.title}</Text>
            </View>
        </TouchableOpacity>

    )
}

export default Card3
