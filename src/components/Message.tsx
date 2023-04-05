import Markdown from 'react-markdown'
import { Loader } from "./Loader"
import { useEffect } from 'react'

export type MessageType = {
    message: string,
    from: "user" | "ai",
    id: string,
    isLoading?: boolean
}

export type MessageProps = {
    message: MessageType
}

export const Message: React.FC<MessageProps> = ({message}) => {

    useEffect(() => {
        const messageElement = document.getElementById(message.id)
        messageElement?.scrollIntoView({behavior: "smooth", block: "end"})
    }, [])

    return (
        <div className={`${message.from} text-primary-text`}>
            <div className={`${message.from === "user" ? "user-message-container" : "ai-message-container"}`}>
                <div className={`${message.from === "user" ? "user-avatar" : "ai-avatar"}`}>
                    {
                        message.from === "user"
                        ? "U"
                        : "AI"
                    }
                </div>
                <div className={`${message.from === "user" ? "user-message" : "ai-message"} message`}>
                    {
                        message.isLoading 
                        ? <Loader />
                        :
                        <div id={message.id} className="text-xs flex-wrap break-before-all">
                            <Markdown>
                                {message.message}
                            </Markdown>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}