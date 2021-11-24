import Form from 'react-bootstrap/Form';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import InputField from './InputField'
import { useHistory } from 'react-router';

const LoginForm = ({ submitHandler, fields }) => {
  const history = useHistory();

  const onSubmit = (event) => {
      submitHandler(event).then(() => history.push('/'))
  }


  return(
    
    <div>
      <Form onSubmit={onSubmit}>
        <Row>
          <Col>
            <InputField field={fields.username} />
          </Col>
          <Col>
            <InputField field={fields.password} />
          </Col>
        </Row>
      
          <Button type="submit">Login</Button>
          <Button type="button" variant="info" onClick={() => history.push('/signup')}>Sign Up</Button>
      
      </Form>
    </div>
  )
}

export default LoginForm