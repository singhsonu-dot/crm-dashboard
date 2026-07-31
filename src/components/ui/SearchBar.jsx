function SearchBar({ value, onChange, placeholder }) {
    return (
        <div className="mb-4 flex flex-col text-black dark:text-white gap-2">
            <input id="search" type="text" value={value} onChange={onChange} placeholder={placeholder}/>
        </div>
    )
}

export default SearchBar