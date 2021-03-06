/**
 * @format
 */
import 'react-native-gesture-handler';
import TrackPlayer from 'react-native-track-player';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./services'));
global.isMusicModal=false
global.title=""
global.id=""
global.song=""
global.subcategory=""
global.sliderValue=0