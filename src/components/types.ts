export interface CommentInfo {
    id: number | null
    productID: number | string
    userID: string
    body: string
    date: string
    hour: string
    isAccept: number | null
}
export interface ProductInfo {
    id: number | null
    title: string
    price: number | null
    count: number | null
    img: string
    popularity: number | null
    sale: number | null
    colors: number | null
  }
  