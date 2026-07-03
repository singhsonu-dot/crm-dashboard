function Loader() {
    return (
        <div className="animate-pulse space-y-4">
            <div className="h-10 w-1/3 rounded bg-slate-700"></div>
            <div className="spcae-y-3">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="h-14 rounded bg-slate-700"></div>
                ))}
            </div>
        </div>
    ) 
}

export default Loader