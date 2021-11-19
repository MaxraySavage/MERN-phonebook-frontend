import { Alert } from "react-bootstrap";

const Message = ({message, messageType}) => {
    if (message === null) {
        return null;
    }

    return(
        <Alert variant={messageType}>
            {message}
        </Alert>
        
    )
}

export default Message;