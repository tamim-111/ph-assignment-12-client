const Button = ({ label, onClick, disabled, type = 'button', wideFull = false }) => {
    return (
        <button type={type} onClick={onClick} disabled={disabled}
            className={
                `btn bg-gradient-to-r from-[#6BDCF6] to-[#25A8D6] text-white hover:brightness-110 
                disabled:cursor-not-allowed
                ${wideFull ? 'w-full' : ''}`
            }>{label}</button>
    )
}

export default Button
