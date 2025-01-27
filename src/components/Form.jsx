import React, { useState , useEffect} from 'react'


function Form(props) {

    const [formData, setFormData] = useState({
        searchterm: ""
    })

    const handleChange = (event)=>{
        setFormData({
            ...formData,
            [event.target.name]:event.target.value
        })

    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.movieSearch(formData.searchterm)
    }
        
    return (
        <div>
            <form onSubmit={handleSubmit}>Find Movie:
                <input 
                type="text"
                name="searchterm" placeholder="Search.."
                onChange={handleChange}
                value={formData.searchterm}
                />
                <input type="submit" value="submit"/>
            </form>
        </div>
    )
}

export default Form