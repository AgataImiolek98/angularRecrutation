import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import Decimal from "decimal.js";

@Injectable({
    providedIn: 'root'
})
export class CurrencyAmountService {
    selectedCurrencyExchangeRate$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor() {}

    getBaseUsdExchangeRate(selectedCurrencyExchangeRate, baseCurrencyExchangeRate) {
        this.selectedCurrencyExchangeRate$.next(Decimal.div(selectedCurrencyExchangeRate, baseCurrencyExchangeRate).toNumber().toFixed(4))
    }

    getValueInUsd(value, selectedCurrencyExchangeRate) {
        return Decimal.div(value, selectedCurrencyExchangeRate).toNumber().toFixed(2)
    }
}