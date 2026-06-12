function SearchBar({ value, onChange, placehholder }) {
    return (
        <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="search" className="text-sm font-medium text-gray-600"/>

            <input id="search" type="text" value={value} onChange={onChange} placeholder={placehholder}/>
        </div>
    )
}

export default SearchBar