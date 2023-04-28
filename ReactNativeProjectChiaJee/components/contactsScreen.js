import { StyleSheet, Text, TouchableOpacity, View, FlatList, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import { globalColor } from "../assets/color/color.js";

export default function ContactsScreen({ navigation, route }) {
    const [data, setData] = useState(require('../assets/data/data.json'));
    const [refreshing, setRefreshing] = useState(false);

    const onShowContactDetails = (item) => {
        navigation.navigate('ContactDetailsScreen', {data: item});
    };

    useEffect(() => {
        setRefreshing(true);
        const updatedData = route.params?.updatedData;
        let updatedDataList = [...data];
        if (updatedData) {
            const index = updatedDataList.findIndex(item => item.id === updatedData.id);
            if (index !== -1) {
                updatedDataList.splice(index, 1, updatedData);
                setData(updatedDataList);
            }
        }
        setRefreshing(false);
    }, [route.params]);


    const handleRefresh = () => {
        setData([]);
        setRefreshing(true);
        setTimeout(() => {
            setData(require('../assets/data/data.json'));
            setRefreshing(false);
        }, 1000);
    };

    return (
        <View style={styles.containerStyle}>
            <FlatList
                data={data}
                renderItem={
                    ({item}) => {
                        return (
                            <TouchableOpacity onPress={() => onShowContactDetails(item)}>
                                <View style={styles.flatListStyle}>
                                    <View style={styles.circleStyle}/>
                                    <Text style={styles.textStyle}>{item.firstName} {item.lastName}</Text>
                                </View>
                                <View style={styles.dividerStyle}/>
                            </TouchableOpacity>
                        );
                    }
                }
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#fff'
    },
    flatListStyle: {
        flex: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    circleStyle: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: globalColor.colorPrimary,
        alignSelf: 'center',
        marginRight: 10
    },
    textStyle: {
        fontSize: 14
    },
    dividerStyle: {
        borderBottomWidth: 1,
        borderColor: '#E6E6E6'
    }
});

