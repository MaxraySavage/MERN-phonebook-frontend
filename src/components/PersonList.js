import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const PersonList = ({persons, deleteEntryOf}) => (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {persons.map((person) => (
          <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.number} </td>
            <td>
              <Button variant="outline-danger" size="sm" onClick={() => deleteEntryOf(person.id)}>
                <i className="bi bi-x"></i>Delete
              </Button>  
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
)

export default PersonList