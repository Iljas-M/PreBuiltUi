export interface Products {
    Products: Product
}

export interface Product {
    titel: string,
    description: string,
    id: string,
    price: string,
    merchantId: string,
    image: string,
    subTitel: string,
    subPrice: string
}


export function createDefaultProduct(): Product {
    return {
        titel: '-1',
        description: '-1',
        id: '-1',
        price: '-1',
        merchantId: '-1',
        image: '-1',
        subTitel: '-1',
        subPrice: '-1'
    }
}