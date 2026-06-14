function EmptyState({ message }) {
    return (
        <div className="py-12 text-center">
            <h3 className="text-1g font-semibold">
                {message}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
                Try another <search></search>
            </p>
        </div>
    )
}

export default EmptyState 