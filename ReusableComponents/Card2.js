import React from 'react'
import { TouchableOpacity, Text, Image, View } from 'react-native'
import constant from '../constant/constant'

const Card2 = (props) => {
    return (
        <TouchableOpacity style={{ height: 100, flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, borderBottomColor: '#828282', borderBottomWidth: 0.2 }} onPress={props.click}>
            <View style={{marginLeft:20}}>
                <Text style={{ color: constant.white }}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Card2
