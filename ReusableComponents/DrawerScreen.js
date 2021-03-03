import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../Screens/Profile';
import EditProfile from '../Screens/EditProfile';
import Terms from '../Screens/Terms';
import Privacy from '../Screens/Privacy';
import About from '../Screens/About';
import Help from '../Screens/Help';
import DrawewContent from '../Screens/DrawerContent'
import UserSettings from '../Screens/Settings';
const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
    return (
            <Drawer.Navigator drawerContent={props=><DrawewContent {...props} />}  initialRouteName="Home"drawerPosition='right'>
                <Drawer.Screen name="Profile" component={Profile} />
                <Drawer.Screen name="Settings"  component={UserSettings} />
                <Drawer.Screen  name="EditProfile"    component={EditProfile} />
                <Drawer.Screen name="Terms"   component={Terms} />
                <Drawer.Screen name="Privacy"  component={Privacy} />
                <Drawer.Screen name="Help"  component={Help} />
                <Drawer.Screen  name="About"  component={About} />
               
               
            </Drawer.Navigator>
    )
}

export default DrawerScreen
