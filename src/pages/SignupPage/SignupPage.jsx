import Form from 'react-bootstrap/Form';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { changeHandler } from '../../helper/helper';
import userService from '../../services/userService';

import Message from '../../components/Message'
import InputField from '../../components/InputField'

const SignupPage = () => {
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [duplicatePassword, setDuplicatePassword] = useState('')
    const [message, setMessage] = useState(null)
    const history = useHistory()

    const fields = {
        username: {
          title: 'Username',
          value: username,
          changeHandler: changeHandler(setUsername),
          type: 'text',
          placeholder: 'Enter your user name'
        },
        firstName: {
            title: 'First Name',
            value: firstName,
            changeHandler: changeHandler(setFirstName),
            type: 'text',
            placeholder: 'Enter your user name'
        },
        lastName: {
            title: 'Last Name',
            value: lastName,
            changeHandler: changeHandler(setLastName),
            type: 'text',
            placeholder: 'Enter your user name'
          },
        password: {
          title: 'Password',
          value: password,
          changeHandler: changeHandler(setPassword),
          type: 'password',
          placeholder: 'Enter your password'
        },
        duplicatePassword: {
            title: 'Repeat Password',
            value: duplicatePassword,
            changeHandler: changeHandler(setDuplicatePassword),
            type: 'password',
            placeholder: 'Repeat password'
          },
      }

    const onSubmit = (event) => {
        event.preventDefault();
        if(password !== duplicatePassword) {
            setMessage('Passwords do not match')
            return
        }
        const newUser = {
            username, firstName, lastName, password
        }
        userService.signup(newUser).then(() => history.push('/login')).catch( error => {
            setMessage(error.response.data.error)
        })
    }

    return (
        <div>
            <Form onSubmit={onSubmit}>
                <Row>
                    <Col>
                        <InputField field={fields.username} />
                    </Col>
                    <Col>
                        <InputField field={fields.firstName} />
                    </Col>
                    <Col>
                        <InputField field={fields.lastName} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <InputField field={fields.password} />
                    </Col>
                    <Col>
                        <InputField field={fields.duplicatePassword} />
                    </Col>
                </Row>
                
                <Button type="submit">Sign Up</Button>
        
            </Form>
            <Message message={message} messageType='danger' />
        </div>
        
    )
}

export default SignupPage