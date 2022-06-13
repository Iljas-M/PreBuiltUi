export interface MerchantAccount {
    MerchantAccount: Merchant
}

export interface Merchant {
    MerchantAccountId: string | null,
    RelatedContract: string | null,
    PaymentProvider: string | null,
    SenderID: string | null,
    CompanyCode: string | null,
    LegalEntityName: string | null,
    SalesOrg: string | null,
    CountryCode: string | null,
    Country: string | null,
    Currency: string | null,
    Configuration: string | null,
    UseCaseConfiguration: string | null,
    Comments: string | null,
    StorePaymentMethodMode: string | null,
    TypeOfCapture: string | null,
    PspCompany: string | null
}

export function createDefaultMerchantAccount(): Merchant {
    return {
        MerchantAccountId: "-1",
        RelatedContract: "-1",
        PaymentProvider: "-1",
        SenderID: "-1",
        CompanyCode: "-1",
        LegalEntityName: "-1",
        SalesOrg: "-1",
        CountryCode: "-1",
        Country: "-1",
        Currency: "-1",
        Configuration: "-1",
        UseCaseConfiguration: "-1",
        Comments: "-1",
        StorePaymentMethodMode: "-1",
        TypeOfCapture: "-1",
        PspCompany: "-1"
    }
}

export function createNullMerchantAccount(): Merchant {
    return {
        MerchantAccountId: null,
        RelatedContract: null,
        PaymentProvider: null,
        SenderID: null,
        CompanyCode: null,
        LegalEntityName: null,
        SalesOrg: null,
        CountryCode: null,
        Country: null,
        Currency: null,
        Configuration: null,
        UseCaseConfiguration: null,
        Comments: null,
        StorePaymentMethodMode: null,
        TypeOfCapture: null,
        PspCompany: null
    }
}