import React from 'react'

const Input = ({ type, placeholder, onChange }) => {
    return (

        <input
            type={type}
            placeholder={placeholder}
            className="text-black w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            onChange={onChange}
        />
    )
}

export default Input
