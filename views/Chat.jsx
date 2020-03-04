import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from "react-native";
import { usePubNub } from "pubnub-react"

export const ChatView = ({ route }) => {
    const userEmoji = route.params.emoji

    const pubnub = usePubNub()

    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])

    // set PubNub UUID and subscribe to chat channel
    useEffect(() => {
        if (pubnub) {
            pubnub.setUUID(userEmoji)

            const listener = {
                message: envelope => {
                    setMessages(msgs => [
                        ...msgs,
                        {
                            id: envelope.message.id,
                            author: envelope.publisher,
                            content: envelope.message.content,
                            timetoken: envelope.timetoken
                        }
                    ])
                }
            }

            pubnub.addListener(listener)
            pubnub.subscribe({ channels: ["chat"] })

            return () => {
                pubnub.removeListener(listener)
                pubnub.unsubscribeAll()
            }
        }
    }, [pubnub])
}