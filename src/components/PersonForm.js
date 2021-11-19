import Form from 'react-bootstrap/Form';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import InputField from './InputField'

const PersonForm = ({ submitHandler, fields }) => {
  return(
    <Form onSubmit={submitHandler}>

      <Row>
        <Col>
          <InputField field={fields.name} />
        </Col>
        <Col>
          <InputField field={fields.number} />
        </Col>
      </Row>
      
        <Button type="submit">Add</Button>
      
    </Form>
  )
}

export default PersonForm