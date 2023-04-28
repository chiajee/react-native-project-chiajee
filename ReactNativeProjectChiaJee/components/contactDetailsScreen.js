import React, { useRef } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { globalColor } from "../assets/color/color.js";

export default function ContactDetailsScreen( { route, navigation } ) {
    const {data} = route.params;

    const inputRef1 = useRef(null);
    const inputRef2 = useRef(null);
    const inputRef3 = useRef(null);
    const inputRef4 = useRef(null);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Button title='Cancel' onPress={() => navigation.goBack()}/>
            ),
            headerRight: () => (
                <Button title='Save' onPress={onSave}/>
            )
        });
    }, []);

    const formik = useFormik({
        initialValues: { firstName: data.firstName, lastName: data.lastName, email: data.email, phone: data.phone },
        onSubmit: (values) => {
            if (values.firstName == null || values.firstName.length < 1) {
                Alert.alert('Error', 'Please Enter Your First Name');
            } else if (values.lastName == null || values.lastName.length < 1) {
                Alert.alert('Error', 'Please Enter Your Last Name');
            } else {
                navigation.navigate('ContactsScreen', {updatedData: {...values, id: data.id}});
            }
        },
    });

    const onSave = () => {
        formik.submitForm().then();
    };


    return (
        <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.containerStyle}>
                <View style={styles.circleStyle}/>
                <View style={styles.containerStyle}>
                    <Text style={styles.subHeaderStyle}>Main Information</Text>
                    <View style={styles.inputContainerStyle}>
                        <Text style={styles.inputTextStyle}>First Name</Text>
                        <TextInput
                            style={styles.inputStyle}
                            value={formik.values.firstName}
                            ref={inputRef1}
                            onChangeText={formik.handleChange('firstName')}
                            onSubmitEditing={() => inputRef2.current.focus()}/>
                    </View>
                    <View style={styles.dividerStyle}/>
                    <View style={styles.inputContainerStyle}>
                        <Text style={styles.inputTextStyle}>Last Name</Text>
                        <TextInput
                            style={styles.inputStyle}
                            value={formik.values.lastName}
                            ref={inputRef2}
                            onChangeText={formik.handleChange('lastName')}
                            onSubmitEditing={() => inputRef3.current.focus()}/>
                    </View>
                    <Text style={styles.subHeaderStyle}>Sub Information</Text>
                    <View style={styles.inputContainerStyle}>
                        <Text style={styles.inputTextStyle}>Email</Text>
                        <TextInput
                            style={styles.inputStyle}
                            value={formik.values.email}
                            ref={inputRef3}
                            onChangeText={formik.handleChange('email')}
                            onSubmitEditing={() => inputRef4.current.focus()}
                            keyboardType="email-address"
                            autoCapitalize="none"/>
                    </View>
                    <View style={styles.dividerStyle}/>
                    <View style={styles.inputContainerStyle}>
                        <Text style={styles.inputTextStyle}>Phone</Text>
                        <TextInput
                            style={styles.inputStyle}
                            value={formik.values.phone}
                            ref={inputRef4}
                            onChangeText={formik.handleChange('phone')}
                            keyboardType="numeric"/>
                    </View>
                    <View style={styles.dividerStyle}/>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff'
    },
    circleStyle: {
        height: 100,
        width: 100,
        borderRadius: 50,
        backgroundColor: globalColor.colorPrimary,
        alignSelf: 'center'
    },
    subHeaderStyle: {
        width: '100%',
        backgroundColor: '#F2F2F2',
        fontWeight: 'bold',
        textAlign: 'left',
        padding: 10,
        marginVertical: 10,
        fontSize: 16
    },
    inputContainerStyle: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputTextStyle: {
        flex: 1
    },
    inputStyle: {
        marginStart: 10,
        padding: 10,
        borderColor: 'gray',
        borderRadius: 5,
        borderWidth: 1,
        flex: 3
    },
    dividerStyle: {
        borderBottomWidth: 1,
        borderColor: '#E6E6E6'
    }
});