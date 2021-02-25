import React from 'react'
import { View, Text } from 'react-native'
import Slider from '@react-native-community/slider';
import constant from '../constant/constant'


const Progressbar = (props) => {
    const time = parseFloat(props.position).toFixed(0)
    const start_time = Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);

    const time1 = parseFloat(props.duration).toFixed(0)
    const end_time = Math.floor(time1 / 60) + ':' + ('0' + Math.floor(time1 % 60)).slice(-2);
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '85%', alignSelf: 'center' }}>
                <Text style={{ color: constant.white }}>{start_time}</Text>
                <Text style={{ color: constant.white }}>{end_time}</Text>
            </View>
            <Slider
                style={{ width: '90%', height: 40, alignSelf: 'center' }}
                value={props.position}
                minimumValue={0}
                maximumValue={props.duration}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onSlidingComplete={(data) => {
                props.goto(data)
                }}
            />
        </View>
    )
}

export default Progressbar
