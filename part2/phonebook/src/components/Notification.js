import "./notification.css"
export const Notification = ({message, error=false}) => {
    if (message == null) {return null}
    return (<div className={`notification ${error ? "error" : ""}`}>
        {message}
    </div>)

}
