import Button from 'react-bootstrap/Button';

const PersonList = ({persons, deleteEntryOf}) => (
    <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number} 
            <Button variant="outline-danger" size="sm" onClick={() => deleteEntryOf(person.id)}>Delete</Button>  
          </li>
        ))}
    </ul>
)

export default PersonList