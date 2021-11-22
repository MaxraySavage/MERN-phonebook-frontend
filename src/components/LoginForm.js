import Form from 'react-bootstrap/Form';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import InputField from './InputField'

const LoginForm = ({ submitHandler, fields }) => {
  return(
    <Form onSubmit={submitHandler}>

      <Row>
        <Col>
          <InputField field={fields.username} />
        </Col>
        <Col>
          <InputField field={fields.password} />
        </Col>
      </Row>
      
        <Button type="submit">Login</Button>
      
    </Form>
  )
}

export default LoginForm