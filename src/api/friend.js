import api from "../utils/api"

export const addFriend = async (userId) => {
    const res = await api.post(`/friend/request/${userId}`)
    return res.data    
}

export const acceptRequest = async (userId) => {

    const res = await api.post(`/friend/add/${userId}`)
    return res.data
}
export const removeFriend = async (userId) => {
    const res = await api.delete(`/friend/remove/${userId}`)
    return res.data
}

export const rejectRequest = async (userId) => {
    const res = await api.delete(`/friend/reject/${userId}`)
    return res.data
}


export const cancelRequest = async (userId) => {
    const res = await api.delete(`/friend/cancel/${userId}`)
    return res.data
}
// -----------------------------------------

export const getFriendsRequests = async () => {
    const res = await api.get(`/user?type=requests`)
    return res.data
}

export const getFriends = async () => {
    const res = await api.get(`/user?type=friends`)
    return res.data
}
