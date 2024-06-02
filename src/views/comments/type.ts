export interface CommentInfo {
    id: number | null
    productID: number | string
    userID: string
    body: string
    date: string
    hour: string
    isAccept: number | null
}
