export interface Checkouts {
    MessageHeader: MessageHeader,
    MerchantPaymentIdentifiers: MerchantPaymentIdentifiers,
    CheckoutRequest: CheckoutRequest
}

export interface MessageHeader {
    ID: "SHOP-TEST",
    CreationDateTime: "2022-02-18T14:51:47.219Z",
    SimulationIndicator: false,
}

export interface MerchantPaymentIdentifiers {
    MerchantAccountID: string | null,
    SenderID: string
}

export interface CheckoutRequest {
    CheckoutType: "PreBuiltUI",
    OrderReference: "307688",
    CustomerReference: "7964",
    ShopperReference: string,
    CountryCode: string,
    Amount: Amount,
    ReturnUrl: "https://localhost:44303"
}

export interface Amount {
    Value: number,
    Currency: string
}