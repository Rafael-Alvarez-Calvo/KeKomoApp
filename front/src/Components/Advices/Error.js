export const Message = ({msg}) => {

    return (
        <div className="errorContainer">
            <p>{msg}</p>
            <ul>
                <li>Al menos una letra y un número</li>
                <li>No puede contener carácteres alfanuméricos</li>
                <li>Contener al menos seis carácteres</li>
            </ul>

        </div>
    )
}

export const Error = ({res}) => {

    if(res === "-2"){

        return <Message />
    }
}
