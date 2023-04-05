import { useCallback, useEffect, useState } from "react"
import { MessageType } from "../components"

const APP_MODE = import.meta.env.MODE
export const MESSAGE_LIMIT = 10

/*global chrome*/
export const useStorage = () => {
    const [messages, setMessages] = useState<Array<MessageType>>([])
    const [limitReached, setLimitReached] = useState<boolean>(false)

    const saveMessages = useCallback(async (currentMessages: Array<MessageType>, fromAi: boolean=false) => {
        if ((fromAi && currentMessages.length - 1 > MESSAGE_LIMIT) || (!fromAi && currentMessages.length > MESSAGE_LIMIT)) {
            setLimitReached(true)
            return;
        } 
        try {
            if (APP_MODE === "development") {
                localStorage.setItem("messages", JSON.stringify(currentMessages))
            } else {
                await chrome?.storage?.sync.set({messages: currentMessages})
            }
        } catch (e) {
            console.warn(e)
        }
    }, [])

    const clearMessages = useCallback(async () => {
        try {
            if (APP_MODE === "development") localStorage.setItem("messages", JSON.stringify([]))
            else{
                await chrome?.storage?.sync.set({messages: []})
            }
            setMessages([])
            setLimitReached(false)
        } catch (e) {
            console.warn(e)
        }
    }, []) 

    useEffect(() => {
        try{
            if (APP_MODE === "development") {
                setMessages(() => {
                    const stringMessages = localStorage.getItem("messages")
                    const currentMessages = JSON.parse(stringMessages || '[]')
                    return currentMessages
                })
            } else {
                chrome?.storage?.sync.get(["messages"])
                    .then((result) => {
                        setMessages(result?.messages || [])
                    })
            }
            } catch (e) {
            console.warn(e)
        }
    }, [])

    useEffect(() => {
        setLimitReached(messages.length >= MESSAGE_LIMIT)
    }, [messages.length])

    return {
        messages,
        setMessages,
        saveMessages,
        clearMessages,
        limitReached
    }
}