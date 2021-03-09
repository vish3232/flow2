import React from 'react'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import constant from '../constant/constant'
const BlogCard = (props) => {

    return (
        <TouchableOpacity onPress={props.click} style={{ backgroundColor: constant.blue, ...styles.container, borderRadius:5 }}>
            <View style={styles.blogContainer}>
                <Image style={{ height: 150, borderTopLeftRadius:5, borderTopRightRadius:5 }} {...props}></Image>
                <Text style={styles.blogTitle}>{props.title}</Text>
            </View>
            <View style={styles.seeMoreContainer} >
                <Text style={styles.seeMore}>See More</Text>
                <Icon1 name="arrow-forward" color='#dcdcdc' size={15} />
            </View>
        </TouchableOpacity>
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
        height: 175,
        overflow: 'hidden'
    },
    blogTitle: {
        marginHorizontal: 10,
        fontSize: 15,
        fontWeight: '700',
        marginTop: 5,
        color:'white',
        fontFamily: "PermanentMarker-Regular"
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
        color: '#dcdcdc',
        fontFamily: "PermanentMarker-Regular"
    }
})


export default BlogCard
