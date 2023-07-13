import axios from "axios"

export const fetchProducts = async ({ queryKey: [_, term] }) => {
    const { data } = await axios.get(`https://dummyjson.com/users/search?q=${term}`)
    const result = (data.users || []).sort((a, b) => (a.firstName > b.firstName) ? 1 : -1)
    return result
}