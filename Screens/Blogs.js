import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Modal, FlatList } from 'react-native'
import Tabbar from '../ReusableComponents/Tabbar';
import constant from '../constant/constant'
import BlogCard from '../ReusableComponents/BlogCard';
import BlogContent from '../ReusableComponents/BlogContent';
import Axios from 'axios'
import Icon from 'react-native-vector-icons/MaterialIcons'
import LoadingScreen from './LoadingScreen'

const Blogs = (props) => {

    const [visible, setvisible] = useState(false)
    const [data, setdata] = useState([])
    const [modalData, setmodalData] = useState([])
    const [isLoading,setLoading]=useState(false)

    useEffect(() => {
        setLoading(true)
        Axios.get('http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:8080/blog/all').then(res => {
        if(res.data.message==="success"){ 
            setLoading(false)   
        setdata(res.data.blogData)
        }
        }).catch(err =>{ 
            setLoading(false)
            console.log(err)})
    }, [])

    const toggle = () => {
        setLoading(!isLoading);
    };

    const toggleModal = (id) => {
        if (visible === true) {
            setvisible(false)
        } else {
            setvisible(true)
            let temp = data.filter(data1 => {
                return data1._id === id
            })
            setmodalData(temp)
        }
    }


    return (
        <View style={{ ...styles.container }}>
        <LoadingScreen toggle={toggle} modalVisible={isLoading} />
            <View style={{  shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,backgroundColor:'white',flexDirection:"row",height: 50, paddingHorizontal: 15, alignItems: 'center', elevation: 1 }}>
                <Icon onPress={()=>props.navigation.goBack()} name="keyboard-backspace" size={40} style={{marginRight:15}} />
                <Text style={{fontSize:16,fontFamily: "PermanentMarker-Regular"}} >Blogs</Text>

            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={({ item }) => <BlogCard source={{ uri: 'http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:8080/blog/blogimage/' + item._id }} title={item.title} content={item.content} click={() => toggleModal(item._id)} />}
                keyExtractor={item => item._id}
            />
                <Tabbar click={() => props.navigation.navigate('Home')} click4={()=> props.navigation.navigate('Blogs')} click2={() => props.navigation.navigate('Profile')} click3={()=> props.navigation.navigate('Premium')} />

            <Modal
                animationType="fade"
                transparent={false}
                visible={visible}
                onRequestClose={() => {
                    toggleModal('close')
                }}>
                {
                    modalData.map(data1 => {
                        return <BlogContent onClick={()=>toggleModal('close')} key={data1._id} source={{ uri: 'http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:8080/blog/blogimage/' + data1._id }} title={data1.title} content={data1.content} />
                    })
                }
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

})


export default Blogs
