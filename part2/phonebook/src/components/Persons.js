const Persons = ({persons, searchQuery})=>(<ul>
        {persons.filter(value => value.name.startsWith(searchQuery)).map((person) => <li key={person.id}>{person.name} {person.number }</li>)}
      </ul>
)

export default Persons