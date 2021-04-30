import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';

//Redux connections and functions
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions/index'; 

//Tab navigator
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createMaterialBottomTabNavigator();

//Empty Screen for add page
const EmptyScreen = () => {
    return(null)
}


//other components
import  FeedScreen  from './main/Feed';

import  ProfileScreen  from './main/Profile';

export class Main extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
    render() {
        const { currentUser } = this.props;
        if(currentUser == undefined) {
            return ( 
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text></Text>
                </View>
            )
        } 
        return (
            <Tab.Navigator initialRouteName="Feed" labeled={false}   barStyle={{ backgroundColor: '#a3a3a3' }}>
                <Tab.Screen name="Feed" component={ FeedScreen } 
                    options={{  
                        tabBarIcon: ({ color , size}) => (
                            <MaterialCommunityIcons name="home" color={color} size={26}/>
                        )
                    }}
                />
                <Tab.Screen name="AddContainer" component={ EmptyScreen } 
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("Add")
                        }
                    })}
                    options={{  
                        tabBarIcon: ({ color , size}) => (
                            <MaterialCommunityIcons name="plus-box" color={color} size={26}/>
                        )
                    }}
                />
                <Tab.Screen name="Profile" component={ ProfileScreen } 
                    options={{  
                        tabBarIcon: ({ color , size}) => (
                            <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                        )
                    }}
                />
                
            </Tab.Navigator>
       )
       
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})

//bind comp to redux
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser} , dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main);
