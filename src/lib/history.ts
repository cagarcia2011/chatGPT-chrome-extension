import { ChatCompletionRequestMessageRoleEnum } from "openai";
import { MessageType } from "../components"

export interface HistoryMessageType {
    role: ChatCompletionRequestMessageRoleEnum;
    content: string;
}
export type HistoryType = Array<HistoryMessageType>

export const getHistory = (messages: Array<MessageType>) : HistoryType => {

    return messages.map(({ message, from}) => {
        return {
            role: from==="user" ? "user" : "assistant",
            content: message
        }
    })
}