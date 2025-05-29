import './Button.css'


export default function Button({value, onClick=null}) {

    return (
        <button className='button' onClick={onClick}>
            {value}
        </button>
    )
}