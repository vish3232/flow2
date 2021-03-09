import React,{useEffect} from 'react'
import { View, Text,ScrollView,StyleSheet } from 'react-native'
import data from '../constant/constant'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import constant from '../constant/constant'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { NavigationContainer, DrawerActions } from '@react-navigation/native';

const About = (props) => {
    
    return (
               <View style={styles.container}>
        <View style={{ backgroundColor:'white',height: 50, flexDirection:'row', alignItems:'center',justifyContent:'space-between',paddingHorizontal:15 }}>
              <View style={{ shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,flexDirection:'row',alignItems:'center'}} >
              <Icon onPress={()=>props.navigation.goBack()} name="keyboard-backspace" color="black" style={{marginRight:15}}  size={30} />
              <Text style={{fontSize:16,fontFamily: "PermanentMarker-Regular"}} >About</Text>
              </View>
              
            <Icon name="dehaze" color="black" size={40} onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())} />
            </View >
            <ScrollView style={{marginTop:20}} >
                <Text style={{width:'80%',alignSelf:'center',fontSize:20,fontFamily: "PermanentMarker-Regular"}} >Flow uses semi-guided mediations to help people harness the power of 
                    their minds to visualize their dreams clearly and make them a reality.
                </Text>
            </ScrollView>

        </View>

     )
}

export default About
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        
        
        
    }
})


