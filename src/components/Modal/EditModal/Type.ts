export interface EditModalProps {
    url: string
    isOpen: boolean
    editsValue: {
      id?: number | null
      title?: string
      price?: number | null
      count?: number | null
      img?: string
      popularity?: number | null
      sale?: number | null
      colors?: number | null
      body?: string
      address?: string
      buy?: number | null
      city?: string
      email?: string
      firsname?: string
      lastname?: string
      password?: string
      phone?: number | null
      score?: number | null
      username?: string
    }
  }