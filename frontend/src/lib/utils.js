const formatDate = (date) => {
    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    })
}

export default formatDate;