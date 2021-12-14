import React, { useEffect, useState, useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, StatusBar } from 'react-native';


const PickAllergens = () => {
    allergens = [
        { allergen: 'Nuts' },
        { allergen: 'Milk' },
        { allergen: 'Eggs' },
        { allergen: 'Fish' },
        { allergen: 'Shellfish' },
        { allergen: 'Wheat' },
        { allergen: 'Soybeans' },
        { allergen: 'Treenuts' },
        { allergen: 'Celery' },
    ]

    return (
        <View style={styles.container}>
            {
                allergens.map((data, index) => {
                    return (
                        <TouchableOpacity>
                        <View style={styles.radioButton} key={index}>
                            <Text style={{ color: 'black' }}>{data.allergen}</Text>
                        </View>
                        </TouchableOpacity>
                    )
                } )
            }
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'lightgrey',
        flex: 1,
        flexWrap: "wrap",
        paddingTop: 264
    },
    radioView: {
        marginTop: 16,
        marginLeft: 16,

    },
    radioButton: {
        flexDirection: 'row',
        alignSelf: "baseline",
        paddingHorizontal: 11,
        paddingVertical: 7,
        borderRadius: 20,
        borderWidth: 1.5
    }
})

export default PickAllergens;