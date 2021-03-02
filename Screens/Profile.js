import React,{ useEffect, useState } from 'react'
import { View, Text, Image, Dimensions,ScrollView,TouchableOpacity,TextInput } from 'react-native'
import constant from '../constant/constant'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Tabbar from '../ReusableComponents/Tabbar';
import ImagePicker from 'react-native-image-picker'
import AsyncStorage from '@react-native-community/async-storage';
import {getUserName,getName,getMobile,getEmail} from '../constant/storage'
import LinearGradient from 'react-native-linear-gradient';
import Axios from 'axios'
const Profile = (props) => {
    const initial=['hello']
    const {height , width} = Dimensions.get('window')
    const [profile, setprofile] = useState('https://images.unsplash.com/photo-1581984433064-234b39961f3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80')
    const [username,setusername]=useState('username')
    const [name,setname]=useState('Full Name')
    const [mobile,setmobile]=useState('mobile no.')
    const [email,setemail]=useState('email-id')
    const [planname,setPlanname]=useState(null)
    useEffect(() => {
        // Your code here
        getProfileDetails()
        
  
  
  
      }, [])

      const getProfileDetails=async()=>{
        getEmail().then((mail) => {

        Axios.post('http://192.168.152.254:5000/user/getProfileDetails',{
          email:JSON.parse( mail)
        }).then(res => {
          setemail(res.data.profileData[0].email)
          setname(res.data.profileData[0].fullname)
          setmobile(res.data.profileData[0].mobile)
          setPlanname(res.data.subcriptionData[0].name)
      }).catch(err => console.log(err))
        })
  
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

      const editprofile=()=>{
        props.navigation.navigate('EditProfile');
      }

      const updateProfileDetails=async()=>{
        let formdata = new FormData();
        var photo = {
          uri: profile,
          type: 'image/jpeg',
          name: 'profile-picture',
        };
        formdata.append("profile", photo)
        formdata.append("fullname",name)
        formdata.append("mobile",mobile)
        formdata.append("email",email)

         const res = await Axios({
          url: 'http://192.168.152.254:5000/user/getProfileDetails/'+email,
          method: 'POST',
          data: formdata,
          headers: {
            Accept: '*/*',
            'Content-Type': 'multipart/form-data'
          }
        });

        if(res.data.message==="Updated"){
          alert("profile updated succesfully...")
          getProfileDetails()
        }
        

      }
      
    return (
      <View style={{flex: 1, backgroundColor:'white'}} >
        <ScrollView contentContainerStyle={{flexGrow:1,paddingHorizontal:20}} >
            <View style={{  shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,backgroundColor:'white',height: 50, flexDirection:'row', alignItems:'center',justifyContent:'space-between' }}>
              <View style={{flexDirection:'row',alignItems:'center'}} >
              <Icon name="keyboard-backspace" color="black" style={{marginRight:15}}  size={30} />
              <Text>Profile</Text>
              </View>
              
            <Icon name="dehaze" color="black" size={40} onPress={()=>props.navigation.toggleDrawer()} />
            </View>

            <View style={{justifyContent:'center', alignItems:'center', marginTop:20}}>
                <Image source={{uri:profile}} style={{height:150, width:150, borderRadius:height+width/2}}></Image>
                <TouchableOpacity onPress={()=>selectPhotoTapped()} style={{marginTop:15,width:130,height:50,backgroundColor:'blue',borderRadius:10,flexDirection:'column',justifyContent:'center',alignItems:'center'}} >
                  <Text style={{color:'white'}} >Update Profile</Text>
                </TouchableOpacity>
                 
             </View>
              <View style={{height:300,flexDirection:'column',alignItems:'flex-start',justifyContent:'space-between'}} >
             <Text style={{color:'black', marginTop:5, fontSize:18, fontFamily: "PermanentMarker-Regular"}}>Name</Text>
             <TextInput onChangeText={(value) => setname(value)} style={{width:'100%',height:40,backgroundColor:'gray',borderRadius:10}} value={name} />
             <Text style={{color:'black', marginTop:5, fontSize:18, fontFamily: "PermanentMarker-Regular"}}>Email</Text>
             <TextInput style={{width:'100%',height:40,backgroundColor:'gray',borderRadius:10}} value={email} onChangeText={(value) => setemail(value)} />
             <Text style={{color:'black', marginTop:5, fontSize:18, fontFamily: "PermanentMarker-Regular"}}>Mobile No.</Text>
             <TextInput style={{width:'100%',height:40,backgroundColor:'gray',borderRadius:10}} value={mobile} onChangeText={(value) => setmobile(value)} />
             <Text style={{color:'black', marginTop:5, fontSize:18, fontFamily: "PermanentMarker-Regular"}} >Plan: {planname}</Text>
             
             <TouchableOpacity style={{marginTop:20,alignSelf:'center',width:130,height:50,backgroundColor:'blue',borderRadius:10,flexDirection:'column',justifyContent:'center',alignItems:'center'}} >
               <Text onPress={()=>updateProfileDetails()} style={{color:'white'}} >Update

               </Text>
             </TouchableOpacity>
          
             </View>

             <LinearGradient  start={{x: 0.4, y: 0.5}} end={{x: 0.5, y: 1}}
   colors={['#b92b27','#1565C0']} style={{marginTop:20,marginBottom:80,width:'100%',height:200,borderRadius:15,justifyContent:'space-around'}} >
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginHorizontal:10}}>
                            <Text style={{paddingHorizontal:10,fontSize:20,color:'white',fontWeight:'bold'}}>Premium Family</Text>
                            </View>
                            <Text style={{width:'90%',alignSelf:'center',color:'white'}}>Lorem ipsum dolor sit amet, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</Text>
                        <TouchableOpacity style={{width:'80%',backgroundColor:'white',height:40,alignSelf:'center',justifyContent:'center',borderRadius:10}}>
                            <Text style={{paddingHorizontal:10,fontSize:20,fontWeight:'bold',alignSelf:'center'}}>Try 1 month free</Text>
                        </TouchableOpacity>
                </LinearGradient>
               
           

            
        </ScrollView>
        <Tabbar click={() => props.navigation.navigate('Home')} click4={()=> props.navigation.navigate('Blogs')} click2={() => props.navigation.navigate('Profile')} click3={()=> props.navigation.navigate('Premium')} />
      
        </View>
    )
}

export default Profile
