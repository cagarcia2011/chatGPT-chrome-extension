import { useEffect, useState } from "react"
import { sendMessage } from "./lib"
import { MessageType, MessagesList, SendButton } from "./components"
import uuid from "react-uuid"
import { BiReset } from 'react-icons/bi'
import { useStorage, MESSAGE_LIMIT } from "./hooks"


function App() {
  const [inputMessage, setInputMessage] = useState<string>("")
  const { messages, setMessages, saveMessages, clearMessages, limitReached } = useStorage()

  const handleSendMessage = async (e: React.MouseEvent<HTMLButtonElement> | null) => {
    if (!inputMessage) return
    setInputMessage("")
    const userMessage = {
      message: inputMessage,
      from: "user",
      id: uuid(),
      isLoading: false
    } satisfies MessageType

    const messagesHistory = [
      ...messages,
      userMessage
    ]

    setMessages(prev => {
      const newMessages = [
        ...prev,
        userMessage
      ]

      saveMessages(newMessages)

      return newMessages
    })

    const aiMessageId = uuid()

    const aiMessage = {
      id: aiMessageId,
      message: "",
      from: "ai",
      isLoading: true
    } satisfies MessageType

    setMessages(prev => ([
      ...prev,
      {
        ...aiMessage
      }
    ]))

    const response = await sendMessage(messagesHistory)

    if (response.message && !response.error) {
      setMessages(prev => {
        const prevMessages = prev.filter(message => message.id !== aiMessageId) satisfies Array<MessageType>

        const newMessages = [
          ...prevMessages,
          {
            ...aiMessage,
            message: response.message!,
            isLoading: false
          } satisfies MessageType
        ]

        saveMessages(newMessages, true)

        return newMessages
      })
    } else {
      setMessages(prev => {
        const prevMessages = prev.filter(message => message.id !== aiMessageId) satisfies Array<MessageType>
        return [...prevMessages]
      })
    }


  }

  const handleClearMessages = async () => {
    setMessages([])
    setInputMessage('')
    await clearMessages()
  }

  return (
    <div className="h-[600px] w-[600px] bg-primary-bg overflow-hidden">
      <div className="app-container overflow-hidden">
        <div className="app-flex-container">
          <div className="outer-chat-container">
            <div className="inner-chat-container inset-shadow">
              <div className="outer-chat-list-container">
                <MessagesList messages={messages} />
              </div>
            </div>
            <div className="user-prompt-container relative">
              {
                limitReached
                && <span className="text-red-300 w-full text-xs absolute -top-4">A limit of {MESSAGE_LIMIT} messages have been reached. Any messages from now on will not persist.</span>
              }
              <div className="user-input-container">
                <input type="text"
                  className="user-input"
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleSendMessage(null)}
                  value={inputMessage}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
                />
              </div>
              <div className="user-send-btn-container">
                <SendButton onClick={handleSendMessage} />
              </div>
              <div onClick={() => handleClearMessages()} className="reset-btn">
                <BiReset size={20} color="white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
