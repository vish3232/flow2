import React,{useEffect,useState} from 'react'
import { View, Text,ScrollView,TextInput,TouchableOpacity,Alert } from 'react-native'
import {getMobile,getEmail} from '../constant/storage'
import DeviceInfo from 'react-native-device-info';
import Header from '../ReusableComponents/Header'
import Mailer from 'react-native-mail'

const Help = () => {
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
          <Header/>
            
          <ScrollView style={{ flexGrow: 1, margin: 10, backgroundColor: 'white', borderRadius: 10 }}>
            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 10 }}>
             
              <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color:'black', marginTop: 20 }}>
                Email:{email}
              </Text>
              <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'black', marginTop: 20 }}>
                Mobile No:{mobile}
              </Text>


              <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: 'black', marginTop: 20 }}>
                AppId:{deviceId}
              </Text>
              <TextInput placeholder='Enter something...' onChangeText={(text)=>{setHelp(text)}} style={{ marginTop:20,marginLeft: 10, marginRight: 10, fontSize: 14, borderWidth:0.5,borderColor:'black',borderRadius:10,borderBottomColor: 'black', width:'90%',height:40,padding:10 }} />
              
            </View>
            <TouchableOpacity onPress={sendEmail} style={{marginTop:20,width:'80%',height:40,borderRadius:10,backgroundColor:'purple',alignSelf:'center',alignItems:'center',justifyContent:'center'}} >
              <Text style={{fontSize:15,color:'white'}}>Send</Text>
            </TouchableOpacity>
            



          </ScrollView>
        </View>

    )
}

export default Help
