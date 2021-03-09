import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import constant from '../constant/constant'

const Tabbar = (props) => {
    return (
        <View style={{ height: 50, width: '100%', backgroundColor:'white', position: 'absolute', bottom: 0, justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal:20 }}>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={props.click}>
                    <Icon name="ios-home" color="gray" size={25} />
                    <Text style={{ color: 'black', fontSize:10,fontFamily: "PermanentMarker-Regular" }}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={props.click4}>
                    <Icon1 name="chrome-reader-mode" color="gray" size={25} />
                    <Text style={{ color: 'black', fontSize:10,fontFamily: "PermanentMarker-Regular" }}>Blogs</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={props.click3}>
                    <Icon1 name="verified-user" color="gray" size={25} />
                    <Text style={{ color: 'black', fontSize:10,fontFamily: "PermanentMarker-Regular" }}>Premium</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={props.click2}>
                    <Icon name="ios-person" color="gray" size={25} />
                    <Text style={{ color: 'black', fontSize:10,fontFamily: "PermanentMarker-Regular" }}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Tabbar
