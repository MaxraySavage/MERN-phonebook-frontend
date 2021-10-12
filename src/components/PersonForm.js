import InputField from './InputField'

const PersonForm = ({ submitHandler, fields }) => {
  return(
    <form onSubmit={submitHandler}>
      {fields.map((field) => (
        <InputField key={field.id} field={field} />
      ))}
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm