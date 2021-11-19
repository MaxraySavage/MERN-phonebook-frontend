import Form from 'react-bootstrap/Form'

const InputField = ({field}) => (
  <Form.Group>
      <Form.Label> {field.title} </Form.Label>
      <Form.Control type={field.type} placeholder={field.placeholder} value={field.value} onChange={field.changeHandler}></Form.Control>
  </Form.Group>
)

export default InputField