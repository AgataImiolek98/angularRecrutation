import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ExchangeRatesResponse, PaymentCurrency } from "../models/exchange-rates.config.interface";

@Injectable({
    providedIn: 'root'
})
export class ExchangeRatesService {
    exchangeRates$: BehaviorSubject<ExchangeRatesResponse> = new BehaviorSubject<ExchangeRatesResponse>(null);
    selectedPaymentCurrency$: BehaviorSubject<PaymentCurrency> = new BehaviorSubject<PaymentCurrency>(null);

    constructor(private http: HttpClient) {}

    getExchangeRatesData(): Observable<ExchangeRatesResponse> {
        return this.http.get<ExchangeRatesResponse>('../../../assets/exchange-rates.json')
    }
}