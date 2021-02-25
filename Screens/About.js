import React,{useEffect} from 'react'
import { View, Text,ScrollView } from 'react-native'
import data from '../constant/constant'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import constant from '../constant/constant'
import Icon from 'react-native-vector-icons/Ionicons'

const About = (props) => {
    
    return (
        <View style={{flex:1,backgroundColor:'#43a047'}}>
            <View style={{margin:10,flexGrow:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <Icon1 onPress={() => props.navigation.goBack()} name="arrow-back"  color='#dcdcdc' size={30} />
            
                <Text style={{alignSelf:'center',fontSize:20,color:'white',fontWeight:'bold'}}>About</Text>
                <Icon name="ios-menu" color={constant.white} size={40} onPress={()=>props.navigation.toggleDrawer()} />
           
            </View>
            <ScrollView style={{flexGrow: 1, margin: 10, borderRadius: 10, backgroundColor: 'white'}}>
                <Text style={{padding: 15,fontSize:22}}>{data.about}</Text>
            </ScrollView>
            
        </View>
    )
}

export default About
