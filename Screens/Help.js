import React,{useEffect,useState} from 'react'
import { View, Text,ScrollView,TextInput,TouchableOpacity,Alert,Linking } from 'react-native'
import {getMobile,getEmail} from '../constant/storage'
import DeviceInfo from 'react-native-device-info';
import Header from '../ReusableComponents/Header'
import Mailer from 'react-native-mail'
import Icon from 'react-native-vector-icons/MaterialIcons'
const Help = (props) => {
  const [mobile,setmobile]=useState('mobile no.')
  const [email,setemail]=useState('email-id')
  const [deviceId,setDeviceId]=useState('')
  const [help,setHelp]=useState('')
    useEffect(() => {
        // Your code here
        getEmail().then((mail) => {

          setemail(JSON.parse (mail))
        });
        getMobile().then((mobileno) => {

          setmobile(JSON.parse (mobileno))
        });
        let deviceId = DeviceInfo.getDeviceId();
           setDeviceId(deviceId)
  
  
      }, [])

      const sendEmail=()=> {
    
        
          Mailer.mail({
              subject: 'Inquiry',
              recipients: ['vishalpurane59@gmail.com'],
              body:help,
              isHTML: true,
             
            }, (error, event) => {
              Alert.alert(
                error,
                event,
                [
                  {text: 'Ok', onPress: () => console.log('OK: Email Error Response')},
                  {text: 'Cancel', onPress: () => console.log('CANCEL: Email Error Response')}
                ],
                { cancelable: true }
              )
            });
          }
            
      
    
    return (
          <View style={{ flex: 1 }}>
          <View style={{  shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,paddingHorizontal:20,backgroundColor:'white',height: 50, flexDirection:'row', alignItems:'center',justifyContent:'space-between' }}>
              <View style={{flexDirection:'row',alignItems:'center'}} >
              <Icon onPress={() => props.navigation.goBack()} name="keyboard-backspace" color="black" style={{marginRight:15}}  size={30} />
              <Text style={{fontSize:16,fontFamily: "PermanentMarker-Regular"}} >Help</Text>
              </View>
              
            <Icon name="dehaze" color="black" size={40} onPress={()=>props.navigation.toggleDrawer()} />
            </View>
            <View style={{flexDirection:'column',justifyContent:'space-evenly',height:180,marginHorizontal:20}} >
            <Text style={{fontSize:25,fontWeight:'bold',fontFamily: "PermanentMarker-Regular"}} >Reach us out</Text>
            <Text style={{fontSize:15,fontFamily: "PermanentMarker-Regular"}}  >For any feedback or quiry please reach us out</Text>
            <Text  style={{fontSize:15,fontFamily: "PermanentMarker-Regular",color:"blue"}} >flowforsport@gmail.com</Text>
            <TouchableOpacity style={{borderRadius:15,alignItems:'center',justifyContent:'center',width:150,height:50,backgroundColor:'#2e74b7'}} onPress={() => Linking.openURL('http://google.com')} >
              <Text style={{color:'white',fontFamily: "PermanentMarker-Regular",fontSize:18,fontWeight:'bold'}} >Visit website</Text>
            </TouchableOpacity>
            </View>
    
          </View>

    )
}

export default Help
