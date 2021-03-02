import React from 'react'
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native'
import constant from '../constant/constant'
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialIcons'
const BlogContent = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ width: '95%', height: '100%', alignSelf: 'center' }}>
            <View style={{height:50,flexDirection:'row',alignItems:'center'}} >
                <Icon name="keyboard-backspace" size={40} />

            </View>
           
                <Image style={{ height: 200 }} {...props}></Image>
                <Text style={styles.blogTitle}>{props.title}</Text>
                <WebView
        originWhitelist={['*']}
        style={{width:"100%",height:"100%"}}
        source={{ html: props.content }}
      />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    blogTitle: {
        marginHorizontal: 10,
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 5,
    
    },
    blogParagraph: {
        marginHorizontal: 10,
        fontSize: 13
    },
})


export default BlogContent
