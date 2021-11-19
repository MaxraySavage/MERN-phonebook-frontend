import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputField from './InputField'

const PersonForm = ({ submitHandler, fields }) => {
  return(
    <Form onSubmit={submitHandler}>
      {fields.map((field) => (
        <>
          <InputField key={field.id} field={field} />
        </>
      ))}
      
        <Button type="submit">Add</Button>
      
    </Form>
  )
}

export default PersonForm