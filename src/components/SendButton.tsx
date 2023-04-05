import { BsSend } from "react-icons/bs"

export interface SendButtonProps {
    onClick: (e:React.MouseEvent<HTMLButtonElement>) => void
}

export const SendButton: React.FC<SendButtonProps> = ({ onClick }) => {

    return (
        <button onClick={onClick} className="user-send-btn">
            <span>Send</span>
            <span className="ml-4">
                <BsSend />
            </span>
        </button>
    )
}