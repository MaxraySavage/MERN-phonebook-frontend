const InputField = ({field}) => (
    <div>
        {field.title}: 
        <input 
          value={field.value}
          onChange={field.changeHandler}  
        />
      </div>
)

export default InputField