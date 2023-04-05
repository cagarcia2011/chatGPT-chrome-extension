import { getAIResponse } from "./openAIConfiguration"

export interface ResponseType {
    message: string | null,
    error: string | null
}


export const sendMessage = async (message: string): Promise<ResponseType> => {

    if (!message) return {
        message: null,
        error: "Message empty"
    }

    const aiResponse = await getAIResponse(message)

    if(!aiResponse) return {
        message: null,
        error: "AI Response error!"
    }

    return {
        message: aiResponse,
        error: null
    }
}