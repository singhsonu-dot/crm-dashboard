function StatCard({ title, value }) {
    return (
        <article className="p-6 bg-white rounded-2x1 shadow-sm border border-gray-100 flex flex-col gap-2 transition-all duration-300 hover:shadow-md">
            <h3 className="text-sm font-medium text-gray-500 tracking-wide">{title}</h3>
            <p className="text-3x1 font-bold text-gay-900 tracking-tight mt-1">{value}</p>
        </article>
    )
}

export default StatCard 