import React, {useState} from 'react';

const Search = (props) => {

    const [keyword, setKeyword] = useState('')
  

    const handleOnClick = () => {
        props.setSearchInput(keyword)
        console.log("clicked")
        props.setFetching(true)
    }

    const handleOnChange = (event) => {
        setKeyword(event.target.value)
    }

    return (
        <div>
            <input htmlFor="search" placeholder="Search for movies" className="searchBar" onChange={handleOnChange}></input>
            <button type="submit" onClick={handleOnClick}>Search</button>
        </div>
    )
}

export default Search;