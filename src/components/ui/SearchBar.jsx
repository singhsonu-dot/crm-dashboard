function SearchBar({ value, onChange, placeholder }) {
    return (
        <div className="mb-4 flex flex-col gap-2">
            <label htmlFor="search" className="text-sm font-medium text-gray-600">
                Search Users
            </label>

            <input id="search" type="text" value={value} onChange={onChange} placeholder={placeholder} className="w-full rounded-1g border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
    )
}

export default SearchBar