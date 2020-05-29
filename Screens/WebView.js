import React from 'react';
import { Text,ToastAndroid, Alert } from 'react-native';
import axios from 'axios';
import WebView from 'react-native-webview';
export default class Webview extends React.Component {
    constructor(props) {
        super(props)
        this.state = { url: null }
    }
    componentDidMount() {
        const { state } = this.props.navigation;
        var url = this.props.route.params.url;
        this.setState({ url: url });
    }
    onNavigationChange(webViewState) {
        let hitUrl = webViewState.url;
        console.log(hitUrl);
        if (hitUrl.includes('http://example.com/')) {
            console.log(hitUrl);
            // we need the payment_req_id to get the status of paymnt
            let payment_final_id = hitUrl.split("request_id=").pop();
            var response = {
                url: hitUrl,
                payment_final_id: payment_final_id
            }

            ToastAndroid.show('Success \n' + JSON.stringify(response), ToastAndroid.SHORT);
            this.getPaymentDetails(payment_final_id);
        }
    }

    getPaymentDetails(trans_id) {
        ToastAndroid.show('Getting transaction status', ToastAndroid.SHORT);

        //insted of this you can do whatever you wan with the response , loading a custom success page with details etc
        const self = this;
        axios.get(`https://test.instamojo.com/api/1.1/payment-requests/${trans_id}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'test_',
                'X-Auth-Token': 'test_'
            }
        }).then(function (response) {
            console.log(response);
            Alert.alert('Response of txn', JSON.stringify(response.data));

        })
            .catch(function (error) {
                console.log(JSON.stringify(error));
                ToastAndroid.show('Error', ToastAndroid.SHORT);

            })
    }
    render() {

        return (
            <WebView
                ref="webview"
                source={{ uri: this.state.url }}
                onNavigationStateChange={this.onNavigationChange.bind(this)}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                // renderLoading={this.renderLoading.bind(this)}
                onMessage={(event) => console.log(event.nativeEvent.data)} />

        );
    }
}