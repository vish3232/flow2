import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../Screens/Profile';
import Settings from '../Screens/Settings';
import EditProfile from '../Screens/EditProfile';
import Terms from '../Screens/Terms';
import Privacy from '../Screens/Privacy';
import About from '../Screens/About';
import Help from '../Screens/Help';

const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
    return (
            <Drawer.Navigator  initialRouteName="Home"drawerPosition='left'>
                <Drawer.Screen name="Profile" component={Profile} />
                <Drawer.Screen name="Settings"  component={Settings} />
                <Drawer.Screen  name="EditProfile"    component={EditProfile} />
                <Drawer.Screen name="Terms"   component={Terms} />
                <Drawer.Screen name="Privacy"  component={Privacy} />
                <Drawer.Screen name="Help"  component={Help} />
                <Drawer.Screen  name="About"  component={About} />
               
               
            </Drawer.Navigator>
    )
}

export default DrawerScreen
