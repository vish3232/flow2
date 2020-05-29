import React, { useEffect } from 'react'
import { View, Image } from 'react-native'
import constant from '../constant/constant'



const AuthLoadingScreen = (props) => {

  



    return (
        <View style={{ flex: 1, backgroundColor: constant.background, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/waves.png')} style={{ height: 60, width: 140 }}></Image>
        </View>
    )
}

export default AuthLoadingScreen
