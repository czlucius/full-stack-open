const Persons = ({persons, searchQuery, deleteHandler}) => (<ul>
        {persons.filter(value => value.name.startsWith(searchQuery)).map((person) =>
            <li key={person.id}>
                {person.name} {person.number} <button onClick={(event) => deleteHandler(person)}>delete</button>
            </li>)}
    </ul>
)

export default Persons