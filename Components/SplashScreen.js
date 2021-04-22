import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList, Image, Dimensions, TouchableOpacity, ImageBackground} from "react-native";
import {StatusBar} from "expo-status-bar";

export default function SplashScreen({navigation}) {
    const screenWidth = Dimensions.get("screen").width;
    const screenHeight = Dimensions.get("screen").height;
    setTimeout(() => {
        navigation.replace('HomeScreen');
        // navigation.navigate('StreamScreen');
    }, 3000);

    return (
        <View style={styles.container}>
            <ImageBackground style={{
                height: screenHeight,
                width: screenWidth,


            }} source={require('../assets/bg.jpg')}>

                <View style={styles.box_text}>
                    <TouchableOpacity onPress={() => {
                        navigation.replace('HomeScreen');

                    }}>
                        <Image style={{height: screenWidth * (1 / 5), width: screenWidth * (1 / 5)}}
                               source={require('../assets/tinder-icon-logo.png')}/>
                    </TouchableOpacity>

                    <Text style={styles.text_title} onPress={() => {
                        navigation.replace('HomeScreen');

                    }}>Tinder NewYear </Text>
                    <Text style={{color: '#ffe53c'}}> AppClone@ Khuat Hong Minh</Text>

                </View>

            </ImageBackground>

            <StatusBar style={'auto'}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1},
    content: {
        flex: 1,
        alignItems: 'center',
    },
    box_text: {
        flex: 1,
        backgroundColor: 'rgba(7,7,7,0.25)',
        alignItems: 'center',
        justifyContent: 'center'

    },
    text_title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ffffff',
        margin: 10

    },
    logo_app: {
        width: 50,
        height: 50,
    }


});
