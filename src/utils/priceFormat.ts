export const formatPrice = (price: string): string => {
    return `R${((parseFloat(price) * 18.75)).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
}