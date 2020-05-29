import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Modal, FlatList } from 'react-native'
import Tabbar from '../ReusableComponents/Tabbar';
import constant from '../constant/constant'
import BlogCard from '../ReusableComponents/BlogCard';
import BlogContent from '../ReusableComponents/BlogContent';
import Axios from 'axios'


const Blogs = (props) => {

    const [visible, setvisible] = useState(false)
    const [data, setdata] = useState([])
    const [modalData, setmodalData] = useState([])

    useEffect(() => {
        Axios.get('https://flow-mobile-backend.herokuapp.com/blog/all').then(res => {
            setdata(res.data)
        }).catch(err => console.log(err))
    }, [])

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
            <View style={{ height: 60, paddingHorizontal: 15, alignItems: 'center', justifyContent: 'center', elevation: 1 }}>
                <Text>Blogs</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={({ item }) => <BlogCard source={{ uri: 'http://192.168.43.93:4000/blog/blogimage/' + item._id }} title={item.title} content={item.content} click={() => toggleModal(item._id)} />}
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
                        return <BlogContent key={data1._id} source={{ uri: 'http://192.168.43.93:4000/blog/blogimage/' + data1._id }} title={data1.title} content={data1.content} />
                    })
                }
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constant.background
    },

})


export default Blogs
