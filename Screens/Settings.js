import React, {useEffect,useState} from 'react'
import { View, Text, StyleSheet,Image,TouchableOpacity,Share,Platform,Linking } from 'react-native'
import TrackPlayer from "react-native-track-player";
import constant from '../constant/constant'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import Switch from '../ReusableComponents/Switch'
import AsyncStorage from '@react-native-community/async-storage'

const GOOGLE_PACKAGE_NAME = 'agrawal.trial.yourfeedback';
const APPLE_STORE_ID = 'id284882215';

const Settings = (props) => {

    useEffect(() => {
    setTimeout(() => {
      //exit()
    }, 10000);
    }, [])

    const [switchValue,setswitchValue]=useState(false)
    const [iosAppLink,setIosAppLink]=useState('iOS App Link')
    const [ androidAppLink,setAndroidAppLink]=useState('Android App Link')

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
    
    return (
        <View style={styles.container}>
            <View style={{flex:1,width:'100%',flexDirection:'column',justifyContent:'center',alignItems:'flex-start'}}>
                <View style={{marginHorizontal:20,flexDirection:'row',alignItems:'flex-start',justifyContent:'space-around'}}>
                <Icon1 onPress={() => props.navigation.goBack()} name="arrow-back"  color='#dcdcdc' size={30} />
            
                    <Text style={{marginLeft:20,alignSelf:'center',fontSize:20,color:'white',fontWeight:'bold'}}>Setting</Text>

                </View>
                <View style={{width:'80%',marginHorizontal:25}}>
                    <Text style={{fontSize:18,color:'white'}}>Change account setting,contact us for support.</Text>
                </View>

                
            </View>
            <View style={{flex:4,width:'100%',backgroundColor:'white',borderRadius:20,flexDirection:'column',alignItems:'flex-start',justifyContent:'flex-start'}}>
                <Text style={{fontSize:20,fontWeight:'bold',color:'#757575',marginHorizontal:20,marginVertical:10}}>Account</Text>
                <View style={{flexDirection:'row',alignItems:'center',marginHorizontal:20}}>
                    <Text style={{fontSize:18}}>Push Notification</Text>
                    <SwitchExample
            toggleSwitch1 = {toggleSwitch1}
            switch1Value = {switchValue}/>

                </View>
              <TouchableOpacity onPress={()=>props.navigation.navigate('EditProfile')}>
              <Text style={{fontSize:18,marginHorizontal:20,marginTop:10}}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>props.navigation.navigate('About')}>
              <Text style={{fontSize:18,marginHorizontal:20,marginTop:10}}>About</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>props.navigation.navigate('Terms')}>
              <Text style={{fontSize:18,marginHorizontal:20,marginTop:10}}>Term and Service</Text>
              
              </TouchableOpacity>  
              <TouchableOpacity onPress={()=>props.navigation.navigate('Privacy')}>
              <Text style={{fontSize:18,marginHorizontal:20,marginTop:10}}>Privacy</Text>
              
              </TouchableOpacity>
              <TouchableOpacity onPress={logOut}>
              <Text style={{fontSize:18,marginHorizontal:20,marginTop:10}}>Logout</Text>
              
              </TouchableOpacity>
              <TouchableOpacity>
              <Text style={{fontSize:20,fontWeight:'bold',color:'#757575',marginHorizontal:20,marginVertical:10}}>Support</Text>
              
              </TouchableOpacity>
              <TouchableOpacity onPress={onShare}>
              <Text style={{fontSize:18,marginHorizontal:20,marginTop:10}}>Share App</Text>
              
              </TouchableOpacity>
              <TouchableOpacity onPress={rateUs}>
              <Text style={{fontSize:18,marginHorizontal:20,marginTop:10}}>Rate Us</Text>
              
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>props.navigation.navigate('Help')}>
              <Text style={{fontSize:18,marginHorizontal:20,marginTop:10}}>Help</Text>
              
              </TouchableOpacity>
               
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        backgroundColor:'#43a047'
    }
})


export default Settings
