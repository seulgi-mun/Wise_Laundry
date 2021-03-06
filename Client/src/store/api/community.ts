import axios from "axios"
import Swal from 'sweetalert2'

const baseURL = process.env.REACT_APP_BASEURL
const boardSize: number = 10

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
  },
})
const apiImageClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "multipart/form-data",
  },
})

apiClient.interceptors.request.use(
  function CustomInterceptorRequest(config){
    return {...config,
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      }
    }
  }
)
apiImageClient.interceptors.request.use(
  function CustomInterceptorRequest(config){
    return {...config,
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      }
    }
  }
)

// πΌπΌπΌκ²μκΈ μ μ²΄β­
export const getCommunityAll = async (lastBoardId: number) => {
  const { data } = await apiClient.get<any>(
    `/community/all/${boardSize}/${lastBoardId}`, 
  )
  return data
}

// πΌπΌπΌκ²μκΈ νκ° μ‘°νβ­
export const getCommunityDetail = async (boardId: number) => {
  const { data } = await apiClient.get<any>(
    `/community/${boardId}`,
  )
  const imgs = data.boardImgs.map((img: { boardImg: string }) => `/images/${img.boardImg}`)
  const res = {...data, boardImgs: imgs}
  delete res.statusCode
  return res
}

// πΌπΌπΌκ²μβ­
export const getSearch = async (keyword: string, lastBoardId: number) => {
  const { data } = await apiClient.get<any>(
    `/community/search/${keyword}/${boardSize}/${lastBoardId}`
    )
  return data
}

// πΌπΌπΌκ²μκΈ μμ±β­
export const postBoard = async (form: any) => {
  const { data } = await apiImageClient.post<any>(
    '/community/create',
    form
  )
  return data
}

// πΌπΌπΌκ²μκΈ μμ μ© μ‘°νβ­
export const getCommunityUpdate = async (boardId: number) => {
  const { data } = await apiClient.get<any>(
    `/community/${boardId}`,
  )
  const imgs = data.boardImgs.map((img: { boardImg: string }) => img.boardImg)
  const res = {
    boardId: data.boardId,
    boardContent: data.boardContent,
    boardImgs: imgs,
    boardName: data.boardName
  }
  return res
}

// πΌπΌπΌκ²μκΈ μμ β­
export const putBoard = async (form: any) => {
  const { data } = await apiClient.put<any>(
    '/community/update',
    form
  )
  return data
}

// πΌπΌπΌκ²μκΈ μ­μ β­
export const delBoard = async (boardId: number) => {
  const { data } = await apiClient.delete<any>(
    `/community/${boardId}`,
  )
  return data
}

// πΌπΌπΌλκΈ μμ±β­
export const postComment = async (form: any) => {
  const { data } = await apiClient.post<any>(
    '/community/comment/create',
    form
  )
  return data
}

// πΌπΌπΌλκΈ μ­μ β­
export const delComment = async (commentId: number) => {
  const { data } = await apiClient.delete<any>(
    `/community/comment/${commentId}`,
  )
  return data
}

// πΌπΌπΌμ‘°νμ μ‘°νβ­
export const getView = async (offset: number) => {
  const { data } = await apiClient.get<any>(
    `/community/${boardSize}/${offset}`, 
  )
  return data
}

// πΌπΌπΌμ‘°νμ μ¦κ°β­
export const putView = async (boardId: number) => {
  const { data } = await apiClient.put<any>(
    `/community/${boardId}`
  )
  return data
}



apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      sessionStorage.clear()
      Swal.fire({
        icon: 'error',
        text: 'λ‘κ·ΈμΈ ν μ¬μ©ν΄μ£ΌμΈμ',
        confirmButtonText: 'νμΈ',
        confirmButtonColor: 'red',
      })
      .then(() => window.location.href = '/login')
    }
    return Promise.reject(err)
  }
)
apiImageClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      sessionStorage.clear()
      Swal.fire({
        icon: 'error',
        text: 'λ‘κ·ΈμΈ ν μ¬μ©ν΄μ£ΌμΈμ',
        confirmButtonText: 'νμΈ',
        confirmButtonColor: 'red',
      })
      .then(() => window.location.href = '/login')
    }
    return Promise.reject(err)
  }
)