import React,{ useEffect, useState } from 'react'
import { View, Text, Image, Dimensions,ScrollView,StyleSheet } from 'react-native'
import constant from '../constant/constant'
import Icon from 'react-native-vector-icons/Ionicons'
import Tabbar from '../ReusableComponents/Tabbar';
import ImagePicker from 'react-native-image-picker'
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import {getUserName,getName,getMobile,getEmail} from '../constant/storage'


const EditProfile = (props) => {
  
  const {height , width} = Dimensions.get('window')
    
    const [profile, setprofile] = useState('https://images.unsplash.com/photo-1581984433064-234b39961f3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80')
    const [username,setusername]=useState('username')
    const [name,setname]=useState('Full Name')
    const [mobile,setmobile]=useState('mobile no.')
    const [email,setemail]=useState('email-id')
   
    useEffect(() => {
        // Your code here
        
        
        getUserName().then((username1) => {
          
          setusername(JSON.parse (username1))
        });
        getEmail().then((mail) => {

          setemail(JSON.parse (mail))
        });
        getMobile().then((mobileno) => {

          setmobile(JSON.parse (mobileno))
        });
        getName().then((fullname) => {

          setname(JSON.parse (fullname))
        });
  
  
  
      }, [])
      const fetchUserData=async()=>{
    
      
       
      }
       const selectPhotoTapped=()=> {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true,
          },
        };
    
        ImagePicker.showImagePicker(options, response => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            
           setprofile(response.uri)
          }
        }); 
      }
      
    
    return (
        <View style={{ flex: 1, backgroundColor: constant.background }}>
            <View style={{ height: 60, paddingHorizontal:15, flexDirection:'row-reverse', alignItems:'center' }}>
            <Icon name="ios-menu" color={constant.white} size={40} onPress={()=>props.navigation.toggleDrawer()} />
            </View>

            <View style={{justifyContent:'center', alignItems:'center', marginTop:20}}>
                <Image source={{uri:profile}} style={{height:height/3, width:width/1.5, borderRadius:height+width/2}}></Image>
                <View style={{height:50, width:50, backgroundColor:constant.blue, position:'absolute', left:width/1.36, top:height/5, borderRadius:width+height/2, justifyContent:'center', alignItems:'center'}}>
                <Icon onPress={selectPhotoTapped} name="ios-camera" color={'#fff'} size={30} />
                </View>
                <TextInput style={style.input} onChangeText={(value) => setusername(value)}>{username}</TextInput>
                <TextInput style={style.input} onChangeText={(value) => setname(value)}>{name}</TextInput>
                <TextInput style={style.input} onChangeText={(value) => setmobile(value)}>{mobile}</TextInput>
                <TextInput style={style.input} onChangeText={(value) => setemail(value)}>{email}</TextInput>
                
                
            </View>
            <TouchableOpacity style={{alignItems:'center',justifyContent:'center',width:'80%',height:50,borderWidth:1,borderColor:'black',borderRadius:10,alignSelf:'center',marginTop:20}}>
              <Text>Submit</Text>
            </TouchableOpacity>
            
        </View>
    )
}

export default EditProfile

const style=StyleSheet.create({
    input: {
        width: '90%',
        minHeight: 40,
        height: 50,
        borderRadius: 10,
        marginTop: 10,
        marginHorizontal:10,
        backgroundColor: 'white',
        alignSelf: 'center',
        elevation: 10
    },
    
})