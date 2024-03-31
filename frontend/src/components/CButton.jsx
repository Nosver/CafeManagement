import React from 'react'

export const CButton = ({ color, name, onclick }) => {
    return (
        <button
            type="button"
            className={`focus:outline-none text-white bg-${color}-400 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-4 py-1 ms-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900`}
            onClick={onclick}
        >
            {name}
        </button>
    )
}