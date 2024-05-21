const Person = ({ person, onDelete }) => (
    <li>
        {person.name} {person.number}
        <button
            key={person}
            onClick={() => onDelete(person.id, person.name)}>
            Delete
        </button>
    </li>
)

export default Person