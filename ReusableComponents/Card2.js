import React from 'react'
import { TouchableOpacity, Text, Image, View } from 'react-native'
import constant from '../constant/constant'

const Card2 = (props) => {
    return (
        <TouchableOpacity style={{ height: 100, flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, borderBottomColor: '#828282', borderBottomWidth: 0.2 }} onPress={props.click}>
            <Image source={{ uri: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=680&q=80' }} style={{ width: 100, height: 80, borderRadius: 10 }}></Image>
            <View style={{marginLeft:20}}>
                <Text style={{ color: constant.white }}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Card2
