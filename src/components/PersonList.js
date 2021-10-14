const PersonList = ({persons, deleteEntryOf}) => (
    <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number} 
            <button onClick={() => deleteEntryOf(person.id)}>Delete</button>  
          </li>
        ))}
    </ul>
)

export default PersonList