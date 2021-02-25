import React from 'react'
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native'
import constant from '../constant/constant'


const BlogContent = (props) => {
    return (
        <View style={{ flex: 1, backgroundColor: constant.background, justifyContent: 'center' }}>
            <View style={{ width: '95%', height: '90%', alignSelf: 'center' }}>
                <Image style={{ height: 200 }} {...props}></Image>
                <Text style={styles.blogTitle}>{props.title}</Text>
                <ScrollView    showsVerticalScrollIndicator={false} >
                    <Text style={styles.blogParagraph}>{props.content}</Text>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    blogTitle: {
        marginHorizontal: 10,
        fontSize: 15,
        fontWeight: '700',
        marginTop: 5
    },
    blogParagraph: {
        marginHorizontal: 10,
        fontSize: 13
    },
})


export default BlogContent
