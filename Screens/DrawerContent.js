import React,{useContext} from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import {DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { UserContext } from '../AuthContext'

const DrawerContent = (props) => {
    const { signOut } = useContext(UserContext)

    const logout=()=>{
        signOut()
    
        props.navigation.navigate('SignInScreen')
    }

    return (
        <View style={{flex:1,flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}} >
            <View style={{flexDirection:'row',alignItems:'center',width:'70%'}} >
                <Image  source={require('../assets/waves.png')} style={{marginLeft:20,marginRight:20,width:80,height:80}} resizeMode="center" />
                <Text>Flow</Text>

            </View>
            <TouchableOpacity onPress={() => props.navigation.navigate('Home')} style={{marginTop:15,flexDirection:'row',alignItems:'center',width:'70%'}} >
               <Icon name="home" size={30} style={{marginLeft:20,marginRight:20}} />
                <Text>Home</Text>


            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('Profile')} style={{marginTop:15,flexDirection:'row',alignItems:'center',width:'70%'}} >
               <Icon name="person" size={30} style={{marginLeft:20,marginRight:20}} />
                <Text>Profile</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('url of term')} style={{marginTop:15,flexDirection:'row',alignItems:'center',width:'70%'}} >
               <Icon name="note" size={30} style={{marginLeft:20,marginRight:20}} />
                <Text>Term of Service</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('url of privacy')} style={{marginTop:15,flexDirection:'row',alignItems:'center',width:'70%'}} >
               <Icon name="note" size={30} style={{marginLeft:20,marginRight:20}} />
                <Text>Privacy Policy</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('Setting')} style={{marginTop:15,flexDirection:'row',alignItems:'center',width:'70%'}} >
               <Icon name="settings" size={30} style={{marginLeft:20,marginRight:20}} />
                <Text>Settings</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('Help')}  style={{marginTop:15,flexDirection:'row',alignItems:'center',width:'70%'}} >
               <Icon name="help" size={30} style={{marginLeft:20,marginRight:20}} />
                <Text>Support</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate('About')} style={{marginTop:15,flexDirection:'row',alignItems:'center',width:'70%'}} >
               <Icon name="headset-mic" size={30} style={{marginLeft:20,marginRight:20}} />
                <Text>About</Text>

            </TouchableOpacity>
            <TouchableOpacity style={{marginTop:15,flexDirection:'row',alignItems:'center',width:'70%'}} >
               <Icon name="share" size={30} style={{marginLeft:20,marginRight:20}} />
                <Text>Share</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={()=>logout()} style={{marginTop:15,flexDirection:'row',alignItems:'center',width:'70%'}} >
               <Icon name="exit-to-app" size={30} style={{marginLeft:20,marginRight:20}} />
                <Text>Sign Out</Text>

            </TouchableOpacity>
           
           
           
            
        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({})
