import React,{useState,useEffect} from "react";
import {Text, View, TouchableOpacity, StyleSheet} from "react-native";

export default function UserItem({ item, pressHandler }){
    return (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => pressHandler(item.id)}>
                <Text>Name: {item.name}</Text>
                <Text>Gender: {item.gender}</Text>
                <Text>Birthday: {item.birthday}</Text>
                <Text>Phone: {item.phone}</Text>
                <Text>Email: {item.email}</Text>
                <Text>Address: {item.address}</Text>
                <Text>Password: {item.password}</Text>
            </TouchableOpacity>
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
        flex: 1

    },


});
