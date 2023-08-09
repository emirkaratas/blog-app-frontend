import axios from "axios"
import BlogItem from "../components/BlogItem"

export const fetchProducts = async ({ queryKey: [_, term] }) => {
    const { data } = await axios.get(`https://dummyjson.com/users/search?q=${term}`)
    const result = (data.users || []).sort((a, b) => (a.firstName > b.firstName) ? 1 : -1)
    return result
}

export const fetchPosts = async ({ queryKey }) => {
    // console.log(queryKey[1])
    // console.log(queryKey[2])
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
    ]


}

export const fetchRegister = async (values) => {
    // throw "Bu İsimle Kullanıcı Var"
    console.log(values)
}

export const fetchLogin = async (values) => {
    throw "Hata"
    //console.log(values)
}

export const postResetPassword = async (values) => {
    // throw "Şifre Yanlış"
    console.log(values)
}

export const fetchLatestPosts = async () => {
    return [
        { id: 0 },
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 }
    ]
}

export const fetchRecommendedPosts = async () => {
    return [
        { id: 0 },
        { id: 1 },
        { id: 2 },
    ]
}

export const postForgotPassword = async (values) => {
    //throw "Hata"
    console.log(values)
    return "Hey"
}