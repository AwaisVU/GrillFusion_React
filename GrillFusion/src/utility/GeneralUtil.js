import { ORDER_STATUS_OPTIONS } from "./constants"

export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
}

export const getOrderStatusColor = (status) => {
    const colorOption = ORDER_STATUS_OPTIONS.find((op)=>op.value === status);
    return colorOption?.color || "secondary";
}