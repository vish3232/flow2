import React, {useEffect,useState} from 'react'
import { View, Text, StyleSheet,Image,TouchableOpacity,Share,Platform,Linking } from 'react-native'
import TrackPlayer from "react-native-track-player";
import constant from '../constant/constant'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import Switch from '../ReusableComponents/Switch'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from 'react-native-gesture-handler';
import {getEmail} from '../constant/storage'
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
const GOOGLE_PACKAGE_NAME = 'agrawal.trial.yourfeedback';
const APPLE_STORE_ID = 'id284882215';

const UserSettings = (props) => {

    useEffect(() => {
    setTimeout(() => {
      //exit()
    }, 10000);
    }, [])

    const [switchValue,setswitchValue]=useState(false)
    const [iosAppLink,setIosAppLink]=useState('iOS App Link')
    const [ androidAppLink,setAndroidAppLink]=useState('Android App Link')
    const [oldPassword,setoldPassword]=useState(null)
    const [newPassword,setnewPassword]=useState(null)
    const [confirmPassword,setconfirmPassword]=useState(null)


    const exit=async()=>{
        try {
            await TrackPlayer.reset();
        } catch (error) {
            alert(error)
          }
        BackHandler.exitApp()
        return true;
    }
   const toggleSwitch1 = (value) => {
        setswitchValue(value)
        
     }

   
    const onShare = async () => {
        try {
  
          var result;
  
          if(Platform.OS == 'ios')
          {
            result = await Share.share({
              url: iosAppLink,
            });
          }
          else
          {
            result = await Share.share({
              message: androidAppLink,
            });
      
          }
          
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
          
         
        }
      };
    
      const logOut=()=>{
        AsyncStorage.clear();
        props.navigation.navigate('SignInScreen')
      }

      

     const rateUs = () => {
        //This is the main trick
        if (Platform.OS != 'ios') {
          Linking.openURL(`market://details?id=${GOOGLE_PACKAGE_NAME}`).catch(err =>
            alert('Please check for the Google Play Store')
          );
        } else {
          Linking.openURL(
            `itms://itunes.apple.com/in/app/apple-store/${APPLE_STORE_ID}`
          ).catch(err => alert('Please check for the App Store'));
        }
      };

      const resetPassword=async()=>{
        getEmail().then((mail) => {

        if(newPassword===confirmPassword){
          Axios.post(constant.url + `/user/ForgotPassword`,{
            email: JSON.parse(mail),
            password:newPassword
        }).then(data => {
            console.log(data)
            if(data.data.message==="Password Changed..."){     
            props.navigation.navigate('SignInScreen');
            }else{
                alert(data.data.message)
            }
          })

        }else{
          alert("enter new and confirm password same...")
        }
      })
      }
    
    return (
        <View style={styles.container}>
        <View style={{ backgroundColor:'white',height: 50, flexDirection:'row', alignItems:'center',justifyContent:'space-between',paddingHorizontal:15 }}>
              <View style={{ shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,flexDirection:'row',alignItems:'center'}} >
              <Icon onPress={()=>props.navigation.goBack()} name="keyboard-backspace" color="black" style={{marginRight:15}}  size={30} />
              <Text style={{fontSize:16,fontFamily: "PermanentMarker-Regular"}} >Setting</Text>
              </View>
              
            <Icon name="dehaze" color="black" size={40} onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())} />
            </View >
            <View style={{paddingHorizontal:15,marginTop:15}} >
            
            <Text style={{fontFamily: "PermanentMarker-Regular",fontSize:16,fontWeight:"bold",marginBottom:10}} >Change Password</Text>
            <View style={{width:'100%',height:350,borderWidth:1,borderColor:'black',flexDirection:'column',alignItems:'center',justifyContent:'space-evenly'}} >
                <View style={{width:'100%',marginLeft:20}} >
                <Text style={{fontFamily: "PermanentMarker-Regular",fontSize:16}} >Old Password</Text>
                <TextInput onChangeText={(value) => setoldPassword(value)} placeholder="enter old password" style={{marginTop:5,paddingLeft:15,borderRadius:15,width:'90%',height:40,backgroundColor:'#E8E8E8'}} />
                </View>
                <View style={{width:'100%',marginLeft:20}} >
                <Text style={{fontFamily: "PermanentMarker-Regular",fontSize:16}} >New Password</Text>
                <TextInput onChangeText={(value) => setnewPassword(value)} placeholder="enter old password" style={{marginTop:5,paddingLeft:15,borderRadius:15,width:'90%',height:40,backgroundColor:'#E8E8E8'}} />
                </View>
                <View style={{width:'100%',marginLeft:20}} >
                <Text style={{fontFamily: "PermanentMarker-Regular",fontSize:16}} >Confirm Password</Text>
                <TextInput onChangeText={(value) => setconfirmPassword(value)} placeholder="enter old password" style={{marginTop:5,paddingLeft:15,borderRadius:15,width:'90%',height:40,backgroundColor:'#E8E8E8'}} />
                </View>
                <TouchableOpacity style={{borderRadius:15,width:150,height:50,backgroundColor:'#2e74b7',flexDirection:'column',alignItems:'center',justifyContent:'center'}} >
                  <Text style={{color:'white',fontFamily: "PermanentMarker-Regular",fontSize:16,fontWeight:'bold'}} >Update</Text>
                </TouchableOpacity>
            </View>
            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        
        
        
    }
})


export default UserSettings
