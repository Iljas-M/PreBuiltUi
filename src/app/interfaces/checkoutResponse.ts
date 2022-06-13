export interface CheckoutResponse {
    CheckoutResponse: Response
}

export interface Response {
    PaymentCheckoutID: string,
    SessionData: string,
    ShopperReference: string
}

export function createDefaultCheckoutResponse(): CheckoutResponse {
    return {
        CheckoutResponse: {
            PaymentCheckoutID: "-1",
            SessionData: "-1",
            ShopperReference: "-1"
        }
    }
}