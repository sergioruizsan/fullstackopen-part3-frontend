const Notification = ({ type, message }) => {
    if (type === null || message === null) {
        return null
    }

    return (
        <div className={`notification ${type}`}>
            {message}
        </div>
    )
}

export default Notification