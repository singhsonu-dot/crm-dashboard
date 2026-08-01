import toast from "react-hot-toast"

export const exportToCSV = (data, filename = 'customers_data.csv') => {
    if (!data || !data.length) {
        toast.error("No data available to export!")
        return
    }

    const headers = Object.keys(data[0])
    const csvRows = [
        headers.join(','), 
        ...data.map(row => 
            headers.map(header => {
                const value = row[header] !== undefined && row[header] !== null ? row[header] : ''
                const escaped = ('' + value).replace(/"/g, '""')
                return `"${escaped}`
            }).join(',')
        )
    ]

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link) 
}