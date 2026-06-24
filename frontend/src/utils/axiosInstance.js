import axios from 'axios'


const axiosInstance = axios.create({

    baseURL: 'http://localhost:5000',
    withCredentials: true

})


let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {

    failedQueue.forEach((prom) => {

        if(error){
            prom.reject(error)
        }else{
            prom.resolve(token)
        }
    })
    failedQueue = []
}


axiosInstance.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem('access-token')
        const csrfToken= localStorage.getItem('csrf-token')
        if(token){

            config.headers.Authorization =
                `Bearer ${token}`

        }

        if(csrfToken){

            config.headers['csrf-token'] = csrfToken

        }
        return config
    },

    (error) => Promise.reject(error)

)


axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {

        const originalRequest = error.config
        if(

            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry

        ){

            if(isRefreshing){

                return new Promise((resolve, reject) => {

                    failedQueue.push({

                        resolve,
                        reject

                    })

                })
                .then((token) => {

                    originalRequest.headers.Authorization =
                        `Bearer ${token}`

                    return axiosInstance(originalRequest)

                })
                .catch((err) => Promise.reject(err))
            }
            originalRequest._retry = true
            isRefreshing = true
            try{
        

                const { data } = await axios.post(
                    'http://localhost:5000/api/auth/refresh',

                    {},

                    {
                        withCredentials: true
                    }
                )

                const newToken = data.accessToken
                localStorage.setItem('access-token',newToken)
                axiosInstance.defaults.headers.common.Authorization =`Bearer ${newToken}`
                processQueue(null, newToken)
                originalRequest.headers.Authorization = `Bearer ${newToken}`
                return axiosInstance(originalRequest)

            }
            catch(refreshError){

                processQueue(refreshError, null)
                localStorage.removeItem(
                    'access-token'
                )

                window.location.href = '/auth/login'
                return Promise.reject(refreshError)

            }
            finally{

                isRefreshing = false

            }
        }
        return Promise.reject(error)
    }
)

export default axiosInstance