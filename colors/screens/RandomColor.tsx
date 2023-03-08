import { ParamListBase, useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useState } from "react"
import { Animated, Dimensions, GestureResponderEvent, Pressable, Text,  View } from "react-native"
import useRandomColor from "../hooks/useRandomColor"
import IColor from "../models/IColor"
import { StyleSheet} from 'react-native';
import { Easing } from "react-native"

import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics';

const circleSize = Math.sqrt(Math.pow(Dimensions.get('window').width,2)+ Math.pow(Dimensions.get('window').height,2))*2

export default () => {
    const {navigate} = useNavigation<StackNavigationProp<ParamListBase>>()
    const {getRandomColor} = useRandomColor()

    const [backgroundColor, SetBackgroundColor] = useState<IColor>(getRandomColor())
    const [position, setPosition] = useState<{x: number, y: number}>({
        x: Dimensions.get('window').width / 2,
        y: Dimensions.get('window').height / 2,
    })

    const [circleColor, SetCircleColor] = useState<IColor>()

    const [scale] = useState<Animated.Value>(new Animated.Value(0))
    const [fade] = useState<Animated.Value>(new Animated.Value(1))

    const fadeInText = () => {
        fade.setValue(0)
        Animated.timing(fade, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.quad
        }).start()
    }


    const handleNewColor = (event: GestureResponderEvent) => {
        impactAsync(ImpactFeedbackStyle.Light)
        const newColor: IColor = getRandomColor(backgroundColor)

        //set cercle position to tap position
        setPosition({x: event.nativeEvent.locationX, y: event.nativeEvent.locationY})

        //set circle color to new color
        SetCircleColor(newColor)

        //reset scale to 0
        scale.setValue(0)
        Animated.timing(scale, {
            //animation settings
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.quad
        }).start(() =>{
            //even when animation is done
            SetBackgroundColor(newColor!)
            fadeInText()
            scale.setValue(0)
        })
    }


    return (
        <Pressable onPress={handleNewColor} style={[styles.container,{backgroundColor: backgroundColor.hex}]}>
            <Animated.View style={{opacity:fade}}>
                <Text style={styles.name}>{backgroundColor.name}</Text>
                <Text style={styles.rgb}>{backgroundColor.rgb}</Text>
                <Text style={styles.hex}>{backgroundColor.hex}</Text>

                <Text style={styles.info}>Tab anywhere to get a new color.</Text>

                <Pressable onPress={() => {navigate('Settings')}} style={null}>
                    <Text style={styles.settings}>Go to settings</Text>
                </Pressable>
            </Animated.View>

            <Animated.View style={[styles.circle,{
                left: position.x,
                top: position.y,
                backgroundColor: circleColor?.hex,
                transform: [
                    {translateX: -circleSize / 2},
                    {translateY: -circleSize / 2},
                    {scale: scale }
                ],
            }]}></Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        padding: 32,
        flex: 1,
        justifyContent: 'center',
    },
    circle:{
        width: circleSize,
        height: circleSize,
        backgroundColor: 'red',
        borderRadius: 999,
        position: 'absolute',
        left: Dimensions.get('window').width / 2,
        top: Dimensions.get('window').height / 2,
        transform: [
            {translateX: -circleSize / 2},
            {translateY: -circleSize / 2},
        ]
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: -100,
        marginBottom: 16,
    },
    rgb: {
        fontSize: 24,
        textAlign: 'left',
    },
    hex: {
        fontSize: 24,
        textAlign: 'left',
        marginBottom: 24,
    },
    info: {
        fontSize: 16,
        textAlign: 'left',
        marginBottom: 32,
        fontWeight: '100',
    },
    settings: {
        fontSize: 16,
        textAlign: 'left',
    },
})