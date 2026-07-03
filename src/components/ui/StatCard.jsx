function StatCard({ title, value}) {
    return (
        <article className="rounded-x1 bg-white dark:bg-slate-800 p-5 shadow-md">
            <h3 className="mb-2 text-slate-900 dark:text-white">
                {title}
            </h3>

            <p className="text-3x1 font-bold text-slate-900 dark:text-white">
                {value}
            </p>
        </article>
    )
}

export default StatCard