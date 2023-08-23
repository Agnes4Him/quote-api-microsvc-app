import { useState } from 'react'

const Home = () => {

    const [text, setText] = useState(null)
    const [error, setError] = useState("")

    const handleOnClick = (e) => {
        e.preventDefault()
        //const url = 'http://localhost:3333'
        //const url = process.env.REACT_APP_BACKEND_URL
        const url = 'http://api-app-backend:3333'
        fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            if (result.message === 'error_occurred') {
                setError("Unable to fetch text. Try again later.")
                setText(null)
                setTimeout(() => {
                    setText(null)
                    setError("")
                }, 5000)
            }else {
                setText(result.message[0])
                setError("")
                setTimeout(() => {
                    setText(null)
                    setError("")
                }, 5000)
                console.log(text)
            }
        })
        .catch((err) => {
            setError("Unable to fetch text. Try again later.")
            setText(null)
            setTimeout(() => {
                setText(null)
                setError("")
            }, 5000)
        })
    }

    return (
        <div className='main-container'>
            <h3>Click the button below to get a <span className='random'>Random Quote</span></h3>
            <button onClick={handleOnClick}>Get Quote!</button>
            { text && <div className="display-container"><h2><q className='quote'>{text.quote}</q><p className='author'> - {text.author}</p></h2></div>}
            { error && <div className="display-container"><h2 className='error'>{error}</h2></div>}
        </div>
    )
}

export default Home