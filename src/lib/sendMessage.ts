import { MessageType } from "../components"
import { HistoryType, getHistory } from "./history"
import { getAIResponse } from "./openAIConfiguration"

export interface ResponseType {
    message: string | null,
    error: string | null
}


export const sendMessage = async (messages: Array<MessageType>): Promise<ResponseType> => {

    if (!messages) return {
        message: null,
        error: "Message empty"
    }

    const history = getHistory(messages)

    const aiResponse = await getAIResponse(history)

    if (!aiResponse) return {
        message: null,
        error: "AI Response error!"
    }

    return {
        message: aiResponse,
        error: null
    }
}