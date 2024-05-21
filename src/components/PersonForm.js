
const Field = ({ text, value, changeHandler }) => (
    <div>
        <label htmlFor={text}>
            {`${text}: `}
        </label>
        <input
            id={text}
            value={value}
            onChange={changeHandler} />
    </div>
)

const PersonForm = ({
    onSubmitHandler,
    nameValue,
    nameChangeHandler,
    numberValue,
    numberChangeHandler
}) => (
    <form onSubmit={onSubmitHandler}>
        <Field
            text="name"
            value={nameValue}
            changeHandler={nameChangeHandler} />
        <Field
            text="number"
            value={numberValue}
            changeHandler={numberChangeHandler} />
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default PersonForm