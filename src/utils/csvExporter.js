import toast from "react-hot-toast"

export const exportToCSV = (data, filename = "export.csv") => {
    if (!data || !data.length) return;

    // 1. Extract Headers
    const headers = Object.keys(data[0]);

    // 2. Format Header Row
    const headerRow = headers.map((header) => `"${header}"`).join(",");

    // 3. Format Data Rows properly escaping quotes and commas
    const dataRows = data.map((row) =>
        headers
            .map((field) => {
                const value = row[field] === null || row[field] === undefined ? "" : String(row[field]);
                // Escape internal double quotes by doubling them
                const escaped = value.replace(/"/g, '""');
                return `"${escaped}"`; // Enclose every field in quotes
            })
            .join(",")
    );

    // 4. Combine headers and rows with new line
    const csvContent = [headerRow, ...dataRows].join("\r\n");

    // 5. Create Blob with UTF-8 BOM (Byte Order Mark) so Excel reads formatting perfectly
    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // 6. Trigger Download
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};