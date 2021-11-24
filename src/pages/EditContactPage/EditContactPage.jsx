import { useHistory, useParams } from "react-router"
import { Form, Row, Col, Button } from "react-bootstrap"
import { useState } from "react"

import InputField from "../../components/InputField"
import { changeHandler } from "../../helper/helper"



const EditContactPage = ({persons, setPersons, displayMessage, personService}) => {
    const history = useHistory()
    const id = useParams().id
    const person = persons.find(p => p.id === id)
    const [editedName, setEditedName] = useState(person.name)
    const [editedNumber, setEditedNumber] = useState(person.number)

    const fields = {
        name: {
          id: 1,
          title: 'Name',
          value: editedName,
          changeHandler: changeHandler(setEditedName),
          type: 'text',
        },
        number: {
          id: 2,
          title: 'Number',
          value: editedNumber,
          changeHandler: changeHandler(setEditedNumber),
          type: 'text',
        }
    }

    const submitHandler = async (event) => {
        event.preventDefault()

        try{
            const editedPerson = {
                name: editedName,
                number: editedNumber
            }
            const updatedPerson = await personService.update(id, editedPerson)
            setPersons(persons.map((person) => {
                return person.id === updatedPerson.id ? updatedPerson : person;
            }));
            let messageText = `${updatedPerson.name}'s number updated`
            displayMessage(messageText, 'success')
            history.push('/contacts')
        }catch(error){
            displayMessage(error.response.data.error, 'danger')
        }

    }

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
      
        <Button type="submit">Save</Button>
      
    </Form>
    )
}

export default EditContactPage