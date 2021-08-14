import React from 'react'

function History({ history }) {
    return (
        <div>
            <ul>
                {history.map((item, index) => {
                    return (<li key={index}> Status Code : {item.statusCode}, Method: {item.method}, Url: {item.url}</li>)
                })}
            </ul>
        </div>
    )
}
export default History