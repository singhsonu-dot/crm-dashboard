function SearchBar({ value, onChange, placeholder }) {
    return (
        <>
        <label htmlFor="search">Search Users</label> 
        <input id="search" type="text" value={value} onChange={onChange} placeholder={placeholder}/>
        </>
    )
}

export default SearchBar