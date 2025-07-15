import axios from 'axios'

// Upload image and return image URL
export const imageUpload = async imageData => {
    const imageFormData = new FormData()
    imageFormData.append('image', imageData)

    const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        imageFormData
    )
    return data?.data?.display_url
}

// save or update user in db
export const saveUserInDb = async user => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/user`,
        {
            name: user.name,
            email: user.email,
            role: user.role,
        }
    )
    return data
}
