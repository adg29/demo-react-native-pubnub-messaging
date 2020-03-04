import "react-native-gesture-handler"
import React from "react"

import { PUBNUB_SUBSCRIBE_KEY, PUBNUB_PUBLISH_KEY } from "react-native-dotenv"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import PubNub from "pubnub"
import { PubNubProvider } from "pubnub-react"

import { EmojiPickerView } from "./views/EmojiPicker";
import { ChatView } from "./views/Chat";


const pubnub = new PubNub({
    subscribeKey: PUBNUB_SUBSCRIBE_KEY,
    publiskKey: PUBNUB_PUBLISH_KEY
})

console.disableYellowBox = true

const Stack = createStackNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <PubNubProvider client={pubnub}>
                <Stack.Navigator headerMode="none">
                    <Stack.Screen name="EmojiPicker" component={EmojiPickerView} />
                    <Stack.Screen name="Chat" component={ChatView} />
                </Stack.Navigator>
            </PubNubProvider>
        </NavigationContainer>
    )
}