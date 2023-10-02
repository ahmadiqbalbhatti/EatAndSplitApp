const Button = function ({onClick, children}) {
    return (
        <button className={"button"} onClick={onClick}>{children}</button>
    );
}

export default Button;
