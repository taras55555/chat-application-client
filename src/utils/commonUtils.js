export const generateItemKey = () => crypto.randomUUID()

export function formatDate(dateString, options={}) {

    if (dateString) {
        const formattedDate = new Date(dateString)
            .toLocaleString('en-US', options)
        return formattedDate
    } else {
        return ''
    }
}