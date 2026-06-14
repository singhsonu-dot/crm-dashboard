function StatCard({ title, value}) {
    return (
        <article className="rounded-x1 bg-slate-800 p-5 shadow-md">
            <h3 className="mb-2 text-slate-400">
                {title}
            </h3>

            <p className="text-3x1 font-bold text-white">
                {value}
            </p>
        </article>
    )
}

export default StatCard