import React, {useState} from 'react';
import {
    StyleSheet, Text, View, FlatList,
    Image, Dimensions, TouchableOpacity,
    ImageBackground, TextInput, ScrollView
} from "react-native";
import {StatusBar} from "expo-status-bar";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export default function AddUserScreen({navigation, route}) {
    const screenWidth = Dimensions.get("screen").width;
    const screenHeight = Dimensions.get("screen").height;
    const URL_ADD_USER = 'https://minhkhph10431.herokuapp.com/add_user';

    const [name, setName] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [gender, setGender] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [address, setAddress] = useState(null);
    const [password, setPassword] = useState(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('birthday', birthday);
    formData.append('gender', gender);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('avatar', 'avatar-tinder-icon-logo.png');
    formData.append('password', password);

//;application/json; charset=UTF-8
    const addUser = () => {
        fetch(URL_ADD_USER, {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData

        }).then(response => {
            console.log(response.toString())
        }).catch(err => {
            console.log(err)
        })

    }


    return (
        <View style={styles.container}>

            <ScrollView style={{flex: 1, padding: 3,}}>
                <KeyboardAwareScrollView style={{flex: 1,}}>
                    <View style={styles.form_login}>
                        <Text style={styles.text_label}>Name</Text>
                        <TextInput style={styles.text_input}
                                   onChangeText={tName => setName(tName)}
                                   value={name}/>

                        <Text style={styles.text_label}>Birthday</Text>
                        <TextInput style={styles.text_input}
                                   onChangeText={tBirthday => setBirthday(tBirthday)}
                                   value={birthday}/>

                        <Text style={styles.text_label}>Gender</Text>
                        <TextInput style={styles.text_input}
                                   onChangeText={tGender => setGender(tGender)}
                                   value={gender}/>

                        <Text style={styles.text_label}>Email</Text>
                        <TextInput style={styles.text_input}
                                   onChangeText={tEmail => setEmail(tEmail)}
                                   value={email}/>

                        <Text style={styles.text_label}>Phone</Text>
                        <TextInput style={styles.text_input}
                                   onChangeText={tPhone => setPhone(tPhone)}
                                   value={phone}/>

                        <Text style={styles.text_label}>Address</Text>
                        <TextInput style={styles.text_input}
                                   onChangeText={tAddress => setAddress(tAddress)}
                                   value={address}/>

                        <Text style={styles.text_label}>Password</Text>
                        <TextInput style={styles.text_input}
                                   onChangeText={tPassword => setPassword(tPassword)}
                                   value={password}/>

                        <TouchableOpacity style={styles.custom_button} onPress={() => addUser()}>
                            <Text style={styles.text_button}>ADD </Text>
                        </TouchableOpacity>
                    </View>

                </KeyboardAwareScrollView>

            </ScrollView>

            <StatusBar style={"auto"}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    boxViewer: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignItems: 'center',


    },
    txtViewer: {
        fontSize: 12,
        color: 'white',

    },
    list_style: {
        alignContent: 'flex-start',
        flexWrap: 'wrap'
    },
    form_login: {

        flex: 1,
        backgroundColor: 'rgba(246,245,245,0.63)',
        padding: 15,
        margin: 20
    },
    logo: {
        width: 90,
        height: 90,
        margin: 20
    },
    text_input: {
        color: "#000",
        marginTop: 5,
        width: '100%',
        height: 30,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,

    },
    text_label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fd0cfa',
        marginTop: 20
    },

    form_button: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: 'center',


    },
    custom_button: {
        marginTop: 10,
        backgroundColor: "#4703a9",
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,

    },
    text_button: {
        color: 'white',
        fontWeight: "bold",
        textAlign: 'center',
        margin: 10,

    },

});
