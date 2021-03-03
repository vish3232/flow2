import React, { useEffect } from 'react'
import { View, Image,Text } from 'react-native'
import constant from '../constant/constant'


const AuthLoadingScreen = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/waves.png')} style={{ height: 60, width: 140 }}></Image>
            <Text style={{position:'absolute',bottom:15,alignSelf:'center',fontSize:20}} >Flow</Text>
        </View>
      
    )
}

export default AuthLoadingScreen
