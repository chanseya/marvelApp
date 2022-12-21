import img from './error.gif';

const ErrorMessage = () => {
    return (
        <img src={img} alt='error' style={{display: "block", margin: "0 auto", height: "200px"}} />
    )
}

export default ErrorMessage;