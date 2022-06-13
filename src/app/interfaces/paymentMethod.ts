export interface ResponsePaymentMethod {
    id: string,
    brand: string,
    holderName: string,
    name: string
}

export function createDefaultResponsePaymentMethod(): ResponsePaymentMethod {
    return {
        id: '',
        brand: '',
        holderName: '',
        name: ''
    }
}