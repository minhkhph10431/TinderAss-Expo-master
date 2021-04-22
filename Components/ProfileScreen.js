import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TextInput,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Platform, Alert
} from "react-native";
import {StatusBar} from "expo-status-bar";
import * as ImagePicker from 'expo-image-picker';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export default function ProfileScreen({navigation, route}) {
    const screenWidth = Dimensions.get("screen").width;
    const screenHeight = Dimensions.get("screen").height;
    const {user} = route.params;
    const URL_ROOT = 'https://minhkhph10431.herokuapp.com/';
    const URL_CHANGE_AVATAR = 'https://minhkhph10431.herokuapp.com/avatar.id=' + user._id;
    const URL_UPDATE = 'https://minhkhph10431.herokuapp.com/user.id=' + user._id;

    const [name, setName] = useState(user.name);
    const [birthday, setBirthday] = useState(user.birthday);
    const [gender, setGender] = useState(user.gender);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [address, setAddress] = useState(user.address);
    const [password, setPassword] = useState(user.password);
    const [avatarURI, setAvatarURI] = useState(URL_ROOT + user.avatar);
    const [resPhoto, setResponsePhoto] = useState(null);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('birthday', birthday);
    formData.append('gender', gender);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('password', password);


    const updateUser = () => {
        fetch(URL_UPDATE, {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData

        }).then(response => {
            console.log(response)
            alert("thanh cong")

        }).catch(err => {
            console.log(err)
        })

    }

    const changeAvatar = () => {

        const photo = {
            uri: avatarURI,
            name: avatarURI.substr(avatarURI.lastIndexOf('/') + 1),
            type: 'image/jpeg'
        }
        const data = new FormData();
        data.append('avatar', photo)

        fetch(URL_CHANGE_AVATAR, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: data}
        ).then(response => response.json())
            .then(json => alert(json))
            .catch(err => {console.log(err)})

    }

    const showImagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

     //   console.log(result);

        if (!result.cancelled) {
            setAvatarURI(result.uri);
           // setResponsePhoto(result);
        }
    }

    // const postImage = (response) => {
    //     const photo = {
    //         uri: response.uri,
    //         name: response.uri.substr(response.uri.lastIndexOf('/') + 1),
    //         type: response.type,
    //     };
    //     const data = new FormData();
    //     data.append('avatar', photo);
    //     const config = {
    //         method: 'POST',
    //         body: data,
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //     };
    //     return fetch(URL_CHANGE_AVATAR, config);
    // }
    //
    // postImage(avatar)
    //     .then(resp => resp.json())
    //     .then(json => console.log(json))
    //     .catch(err => console.log(err))

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Warning', 'Permission was denied!')
                }
            }
        })();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView style={{flex: 1}}>
                <KeyboardAwareScrollView style={{flex: 1,}}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center', margin: 10
                    }}>
                        <TouchableOpacity style={{backgroundColor: '#9a9393', borderRadius: 100}} onPress={() => {
                            showImagePicker().then(r => {
                                console.log(r)
                            })
                        }}>
                            {avatarURI && <Image style={{
                                width: screenWidth * 0.5,
                                height: screenWidth * 0.5,
                                borderRadius: 100
                            }} source={{uri: avatarURI}}/>}
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.custom_button} onPress={() => {
                            changeAvatar()
                            // alert(user._id+'/'+user.name)
                        }}>
                            <Text style={styles.text_button}>CHANGE AVATAR </Text>
                        </TouchableOpacity>

                    </View>

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

                        <TouchableOpacity style={styles.custom_button} onPress={() => updateUser()}>
                            <Text style={styles.text_button}>SAVE INFO </Text>
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
        padding: 3,

    },
    form_login: {

        flex: 1,
        backgroundColor: 'rgba(246,245,245,0.63)',
        padding: 15,
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
