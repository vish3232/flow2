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
import LoadingScreen from './LoadingScreen'
const Profile = (props) => {
    const {height , width} = Dimensions.get('window')
    const [profile, setprofile] = useState('https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png')
    const [name,setname]=useState('Full Name')
    const [mobile,setmobile]=useState('mobile no.')
    const [email,setemail]=useState('email-id')
    const [planname,setPlanname]=useState(null)
    const [isLoading,setLoading]=useState(false)
    useEffect(() => {
        // Your code here
        getProfileDetails()
        
  
  
  
      }, [])

      const getProfileDetails=async()=>{
        setLoading(true)
        getEmail().then((mail) => {

        Axios.post('http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:8080/user/getProfileDetails',{
          email:JSON.parse( mail)
        }).then(res => {
          console.log(res.data)
          setLoading(false)
          setprofile(res.data.profileData[0].filename===null?"https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png":res.data.filename)
          setemail(res.data.profileData[0].email)
          setname(res.data.profileData[0].fullname)
          setmobile(res.data.profileData[0].mobile)
          setPlanname(res.data.subcriptionData[0].name)
          global.startDate=res.data.profileData[0].timeStamp
      }).catch(err =>{ 
        setLoading(false)
        console.log(err)})
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
        setLoading(true)
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
          url: 'http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:8080/user/updateProfile/'+email,
          method: 'PUT',
          data: formdata,
          headers: {
            Accept: '*/*',
            'Content-Type': 'multipart/form-data'
          }
        });

        if(res.data.message==="Updated"){
          setLoading(false)
          alert("profile updated succesfully...")
          getProfileDetails()
        }
        

      }
      const toggle = () => {
        setLoading(!isLoading);
      };
      
    return (
      <View style={{flex: 1, backgroundColor:'white'}} >
      <LoadingScreen toggle={toggle} modalVisible={isLoading} />
        <ScrollView contentContainerStyle={{flexGrow:1}} >
            <View style={{  shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,backgroundColor:'white',height: 50, flexDirection:'row', paddingHorizontal:15,alignItems:'center',justifyContent:'space-between' }}>
              <View style={{flexDirection:'row',alignItems:'center'}} >
              <Icon name="keyboard-backspace" onPress={()=>props.navigation.goBack()} color="black" style={{marginRight:15}}  size={30} />
              <Text style={{fontSize:16,fontFamily: "PermanentMarker-Regular"}} >Profile</Text>
              </View>
              
            <Icon name="dehaze" color="black" size={40} onPress={()=>props.navigation.toggleDrawer()} />
            </View>
            <View style={{paddingHorizontal:20}} >
            <View style={{justifyContent:'center', alignItems:'center', marginTop:20}}>
                <Image source={{uri:profile}} style={{height:150, width:150, borderRadius:height+width/2}}></Image>
                <TouchableOpacity onPress={()=>selectPhotoTapped()} style={{marginTop:15,width:130,height:50,backgroundColor:'#2e74b7',borderRadius:10,flexDirection:'column',justifyContent:'center',alignItems:'center'}} >
                  <Text style={{color:'white',fontFamily: "PermanentMarker-Regular",fontWeight:'bold'}} >Upload Profile</Text>
                </TouchableOpacity>
                 
             </View>
              <View style={{height:300,flexDirection:'column',alignItems:'flex-start',justifyContent:'space-between'}} >
             <Text style={{color:'black', marginTop:5, fontSize:18, fontFamily: "PermanentMarker-Regular"}}>Name</Text>
             <TextInput onChangeText={(value) => setname(value)} style={{paddingLeft:15,width:'100%',height:40,backgroundColor:'#E8E8E8',borderRadius:10}} value={name} />
             <Text style={{color:'black', marginTop:5, fontSize:18, fontFamily: "PermanentMarker-Regular"}}>Email</Text>
             <TextInput style={{paddingLeft:15,width:'100%',height:40,backgroundColor:'#E8E8E8',borderRadius:10}} value={email} onChangeText={(value) => setemail(value)} />
             <Text style={{color:'black', marginTop:5, fontSize:18, fontFamily: "PermanentMarker-Regular"}}>Mobile No.</Text>
             <TextInput style={{paddingLeft:15,width:'100%',height:40,backgroundColor:'#E8E8E8',borderRadius:10}} value={mobile} onChangeText={(value) => setmobile(value)} />
             <Text style={{color:'black', marginTop:5, fontSize:18, fontFamily: "PermanentMarker-Regular"}} >Plan: {planname}</Text>
             
             <TouchableOpacity style={{marginTop:20,alignSelf:'center',width:130,height:50,backgroundColor:'#2e74b7',borderRadius:10,flexDirection:'column',justifyContent:'center',alignItems:'center'}} >
               <Text onPress={()=>updateProfileDetails()} style={{color:'white',fontFamily: "PermanentMarker-Regular",fontSize:16,fontWeight:'bold'}} >Update

               </Text>
             </TouchableOpacity>
          
             </View>

             <LinearGradient  start={{x: 0.4, y: 0.5}} end={{x: 0.5, y: 1}}
   colors={['#00C9FF','#92FE9D']} style={{marginTop:40,marginBottom:80,width:'100%',height:200,borderRadius:15,justifyContent:'space-around'}} >
                    <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginHorizontal:10}}>
                            <Text style={{paddingHorizontal:10,fontSize:20,color:'white',fontWeight:'bold',fontFamily: "PermanentMarker-Regular"}}>Premium</Text>
                            </View>
                            <Text style={{width:'90%',alignSelf:'center',color:'white',fontFamily: "PermanentMarker-Regular"}}>Upgrade to Premium to unlock all visualisation tracks!</Text>
                        <TouchableOpacity onPress={()=> props.navigation.navigate('Premium')} style={{width:'80%',backgroundColor:'white',height:40,alignSelf:'center',justifyContent:'center',borderRadius:10}}>
                            <Text style={{paddingHorizontal:10,fontSize:20,fontWeight:'bold',alignSelf:'center',fontFamily: "PermanentMarker-Regular"}}>Try 1 month free</Text>
                        </TouchableOpacity>
                </LinearGradient>
                </View>
               
           

            
        </ScrollView>
        <Tabbar click={() => props.navigation.navigate('Home')} click4={()=> props.navigation.navigate('Blogs')} click2={() => props.navigation.navigate('Profile')} click3={()=> props.navigation.navigate('Premium')} />
      
        </View>
    )
}

export default Profile
