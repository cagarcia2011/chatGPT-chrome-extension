import { Message, MessageType } from "./Message"

export type MessagesListProps = {
    messages: Array<MessageType>
}

export const MessagesList: React.FC<MessagesListProps> = ({ messages }) => {
    return (
        <div className="chat-list-container">
            <div id="messages-list" className="chat-list-grid">
                {
                    messages.map(message => (
                        <Message key={message.id} message={message} />
                    ))
                }
            </div>
        </div>
    )
}