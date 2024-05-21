import Person from './Person'

const sanitize = (personName) => personName.toLocaleLowerCase()

const getFiltered = (persons, filter) => (
    persons.filter(person => (
        sanitize(person.name).includes(sanitize(filter))
    ))
)

const Persons = ({ persons, filter, onDelete }) => {
    const filteredPersons = getFiltered(persons, filter)
    return (
        <ul
            style={{
                listStyleType: 'none',
                padding: 0,
            }}
        >
            {
                filteredPersons.map(person =>
                    <Person
                        key={person.name}
                        person={person}
                        onDelete={onDelete}
                    />
                )
            }
        </ul>
    )
}

export default Persons