import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    Dimensions,
    Alert,
    TouchableOpacity,
    ImageBackground,

} from "react-native";
import {StatusBar} from "expo-status-bar";
import ViewPager from "@react-native-community/viewpager";
import UserItem from "./UserItem";
import {IconButton, Colors} from "react-native-paper";
import {Ionicons, Fontisto, Foundation, FontAwesome5, Feather, FontAwesome, Entypo,MaterialCommunityIcons} from "@expo/vector-icons";


export default function HomeScreen({navigation}) {


    const screenWidth = Dimensions.get("screen").width;
    const screenHeight = Dimensions.get("screen").height;
    const [data, setArrData] = useState([]);
    const URL_ROOT = 'https://minhkhph10431.herokuapp.com/';
    const URL_DELETE = 'https://minhkhph10431.herokuapp.com/delete.id=';
    const URL_GET_USERS = 'https://minhkhph10431.herokuapp.com/get_user';


    const deleteUser = (id) => {
        fetch(URL_DELETE + id, {method: 'GET'})
            .then(() => {
                // Issue GET request after item deleted to get updated list
                // that excludes user of id
                return fetch(URL_GET_USERS)
            })
            .then(response => response.json())
            .then(result => {
                    const code = result.errorCode;
                    if (code === 400) {
                        alert(result.errorMessage);
                    } else if (code === 200) {
                        setArrData(result.data);
                    }
                }
            )
    }

    useEffect(() => {
        fetch(URL_GET_USERS)
            .then(response => response.json())
            .then(result => {
                    const code = result.errorCode;
                    if (code === 400) {
                        alert(result.errorMessage);
                    } else if (code === 200) {
                        setArrData(result.data);
                    }
                }
            )
            .catch(error => console.log('error', error));
    });

    return (
        <View style={styles.container}>

            <ImageBackground style={{
                height: screenHeight,
                width: screenWidth,
                justifyContent: 'center',


            }} source={require('../assets/background_gradient.png')}>

                <ViewPager style={styles.viewPager} initialPage={0}>
                    {data.map((item, index) => {
                        return (
                            <View key={index} style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',

                            }}>

                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(234,215,228,0.53)',
                                    borderRadius: 15,
                                    width: screenWidth-5,
                                    height: screenHeight * 0.8,
                                    shadowColor: 'rgba(0,0,0,0.53)',
                                    shadowOffset: {
                                        width: 0,
                                        height: 3
                                    },
                                    shadowRadius: 10,
                                    shadowOpacity: 1.0
                                }}>
                                    <TouchableOpacity style={styles.center_contents} onPress={() => {
                                        navigation.navigate('ProfileScreen', {user: item});
                                    }}>
                                        <ImageBackground style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            width: screenWidth-5,
                                            height: screenHeight * 0.8,
                                            padding: 5,
                                        }} imageStyle={{borderRadius: 15,}} source={{uri: URL_ROOT + item.avatar}}>
                                            <View style={{
                                                flex: 1,
                                                justifyContent: 'flex-end',
                                                marginVertical:5
                                            }}>

                                                <Text style={styles.text_name}>{item.name}</Text>
                                                <View style={styles.info}>
                                                    <Fontisto name="transgender-alt" size={20} color={Colors.blue400}/>
                                                    <Text style={styles.info_item}>{item.gender}</Text>
                                                </View>
                                                <View style={styles.info}>
                                                    <FontAwesome5 name="birthday-cake" size={20}
                                                                  color={Colors.blue400}/>
                                                    <Text style={styles.info_item}>{item.birthday}</Text>
                                                </View>
                                                <View style={styles.info}>
                                                    <Ionicons name="ios-location-sharp" size={20} color={Colors.blue400}/>
                                                    <Text style={styles.info_item}>{item.address}</Text>
                                                </View>




                                            </View>
                                            <View style={styles.remove}>
                                                <TouchableOpacity style={styles.custom_button2} onPress={() => {
                                                     deleteUser(item._id);
                                                }}>
                                                    <MaterialCommunityIcons name="account-remove-outline" size={20} color={Colors.white} />
                                                </TouchableOpacity>
                                            </View>
                                        </ImageBackground>

                                    </TouchableOpacity>


                                </View>

                            </View>
                        )
                    })}
                </ViewPager>
                <View style={{alignItems: 'center',
                    justifyContent: 'center', backgroundColor:'rgba(252,248,248,0.22)'}}>
                    <TouchableOpacity style={styles.custom_button} onPress={() => navigation.navigate('AddUserScreen')}>

                        <Ionicons name="person-add-sharp" size={30} color='#fff'/>

                    </TouchableOpacity>
                </View>

            </ImageBackground>
            <StatusBar style={'auto'}/>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    center_contents: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewPager: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,70,229,0)',


    },
    pager: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(241,146,228,0.37)',
        flex: 1,
        borderRadius: 20
    },
    text: {
        color: '#000'
    },
    custom_button: {
        backgroundColor: "rgba(108,98,241,0.62)",
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin:5
    },
    custom_button2: {
        backgroundColor: "rgba(212,142,250,0.36)",
        borderRadius: 50,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    text_button: {
        color: 'white',
        fontWeight: "bold",
        textAlign: 'center',
        margin: 10,

    },
    text_name: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#ffffff',

        textShadowColor: 'rgba(0,0,0,0.87)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10

    },
    info: {
        flexDirection: 'row'
    },
    info_item: {
        color: '#f5f6f6',
        fontSize: 18,
        margin: 3,
        textShadowColor: 'rgba(0,0,0,0.85)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    remove:{
      alignItems:'flex-start'
    }

});
