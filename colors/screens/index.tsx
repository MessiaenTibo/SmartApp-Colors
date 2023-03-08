import { ParamListBase, StackNavigationState, TypedNavigator } from "@react-navigation/core"
import { StackActions } from "@react-navigation/native"
import RandomColor from "./RandomColor"
import Settings from "./Settings"
import 'react-native-gesture-handler';
import { StackNavigationOptions } from "@react-navigation/stack";
import { StackNavigationEventMap } from "@react-navigation/stack/lib/typescript/src/types";
import { NativeComponentType } from "react-native/Libraries/Utilities/codegenNativeComponent";
import { createStackNavigator } from "@react-navigation/stack";

const Stack : TypedNavigator< ParamListBase, StackNavigationState<ParamListBase>, StackNavigationOptions, StackNavigationEventMap, NativeComponentType<any>>= createStackNavigator()

const screenOptions : StackNavigationOptions = { headerShown: false }

export default () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name="RandomColor" component={RandomColor}/>
            <Stack.Screen name="Settings" component={Settings}/>
        </Stack.Navigator>
    )
}