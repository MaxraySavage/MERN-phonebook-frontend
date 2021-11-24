export const changeHandler = (setValue) => {
    return (event) => {
      setValue(event.target.value)
    }
  }

