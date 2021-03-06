import React,{useContext} from 'react'
import { Share,StyleSheet, Text, View,Image,TouchableOpacity,Linking } from 'react-native'
import {DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { UserContext } from '../AuthContext'

const DrawerContent = (props) => {
    const { signOut } = useContext(UserContext)

    const onShare = async () => {
        try {
          const result = await Share.share({
           title: 'App link',
      message: 'Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en', 
      url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en'
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };

    const logout=()=>{
        signOut()
    
        props.navigation.navigate('SignInScreen')
    }

    return (
        <View style={{flex:1,flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}} >
            <View style={{flexDirection:'row',alignItems:'center',width:'70%'}} >
                <Image  source={require('../assets/waves.png')} style={{marginLeft:20,marginRight:20,width:80,height:80}} resizeMode="center" />
                <Text style={{fontSize:14,fontFamily: "PermanentMarker-Regular"}} >Flow</Text>

            </View>
            <TouchableOpacity onPress={() => props.navigation.navigate('Home')} style={{marginTop:15,flexDirection:'row',alignItems:'center',width:'70%'}} >
               <Icon name="home" size={30} style={{marginLeft:20,marginRight:20}} />
                <Text style={{fontSize:14,fontFamily: "PermanentMarker-Regular"}} >Home</Text>


            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('Profile')} style={{marginTop:15,flexDirection:'row',alignItems:'center',width:'70%'}} >
               <Icon name="person" size={30} style={{marginLeft:20,marginRight:20}} />
                <Text style={{fontSize:14,fontFamily: "PermanentMarker-Regular"}} >Profile</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('http://google.com')} style={{marginTop:15,flexDirection:'row',alignItems:'center',width:'70%'}} >
               <Icon name="note" size={30} style={{marginLeft:20,marginRight:20}} />
                <Text style={{fontSize:14,fontFamily: "PermanentMarker-Regular"}} >Terms of Service</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('http://google.com')} style={{marginTop:15,flexDirection:'row',alignItems:'center',width:'70%'}} >
               <Icon name="note" size={30} style={{marginLeft:20,marginRight:20}} />
                <Text style={{fontSize:14,fontFamily: "PermanentMarker-Regular"}} >Privacy Policy</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('UserSetting')} style={{marginTop:15,flexDirection:'row',alignItems:'center',width:'70%'}} >
               <Icon name="settings" size={30} style={{marginLeft:20,marginRight:20}} />
                <Text style={{fontSize:14,fontFamily: "PermanentMarker-Regular"}} >Settings</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('Help')}  style={{marginTop:15,flexDirection:'row',alignItems:'center',width:'70%'}} >
               <Icon name="help" size={30} style={{marginLeft:20,marginRight:20}} />
                <Text style={{fontSize:14,fontFamily: "PermanentMarker-Regular"}} >Support</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('About')} style={{marginTop:15,flexDirection:'row',alignItems:'center',width:'70%'}} >
               <Icon name="headset-mic" size={30} style={{marginLeft:20,marginRight:20}} />
                <Text style={{fontSize:14,fontFamily: "PermanentMarker-Regular"}} >About</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={()=>onShare()}  style={{marginTop:15,flexDirection:'row',alignItems:'center',width:'70%'}} >
               <Icon name="share" size={30} style={{marginLeft:20,marginRight:20}} />
                <Text style={{fontSize:14,fontFamily: "PermanentMarker-Regular"}} >Share</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={()=>logout()} style={{marginTop:15,flexDirection:'row',alignItems:'center',width:'70%'}} >
               <Icon name="exit-to-app" size={30} style={{marginLeft:20,marginRight:20}} />
                <Text style={{fontSize:14,fontFamily: "PermanentMarker-Regular"}} >Sign Out</Text>

            </TouchableOpacity>
           
           
           
            
        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({})
