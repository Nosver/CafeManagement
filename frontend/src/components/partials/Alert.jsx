import React from 'react'


export const Alert = ({ color, alert_type, alert_text }) => {

    const bgColor = `bg-${color}-600`;
    const textColor = `text-${color}-600`;

    return (
        <div>
            <div class="-m-2 text-center">
                <div class="p-2">
                    <div class={`inline-flex items-center bg-white leading-none ${textColor} rounded-full p-2 shadow text-teal text-sm`}>
                        <span className={`inline-flex ${bgColor} text-white rounded-full h-6 px-3 justify-center items-center`}>{alert_type}</span>
                        <span class="inline-flex px-2">{alert_text}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
