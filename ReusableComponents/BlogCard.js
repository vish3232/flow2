import React from 'react'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import constant from '../constant/constant'


const BlogCard = (props) => {

    return (
        <View style={{ backgroundColor: constant.blue, ...styles.container, borderRadius:5 }}>
            <View style={styles.blogContainer}>
                <Image style={{ height: 150, borderTopLeftRadius:5, borderTopRightRadius:5 }} {...props}></Image>
                <Text style={styles.blogTitle}>{props.title}</Text>
                <Text style={styles.blogParagraph}>{props.content}</Text>
            </View>
            <TouchableOpacity style={styles.seeMoreContainer} onPress={props.click}>
                <Text style={styles.seeMore}>See More</Text>
                <Icon1 name="arrow-forward" color='#dcdcdc' size={15} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        elevation: 8,
        marginTop:20,
    },
    blogContainer: {
        height: 200,
        overflow: 'hidden'
    },
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
    seeMoreContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    seeMore: {
        fontSize: 12,
        marginVertical: 10,
        marginLeft: 10,
        color: '#dcdcdc'
    }
})


export default BlogCard
