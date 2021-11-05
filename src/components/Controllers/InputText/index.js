import React from 'react'

const InputText = ({
  name,
  id,
  type,
  value,
  onChange,
  placeholder,
  ...other
}) => {
  return (
    <div className={`mt-2 relative`}>
      <input 
        className={`w-full focus:outline-none leading-7 bg-transparent`}
        type={type}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        {...other}
      />
    </div>
  )
}

export default InputText
