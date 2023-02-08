import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, combineLatest, map, Observable, startWith, Subject, takeUntil } from "rxjs";
import { Categories, Cost } from "../models/costs.config.interface";
import { ExchangeRatesResponse } from "../models/exchange-rates.config.interface";
import { CategoriesService } from "../services/categories.service";
import { ExchangeRatesService } from "../services/exchange-rates.service";
import { CurrencyAmountService } from "../services/currency-amount.service";

@Component ({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss']
})

export class ContainerComponent implements OnInit, OnDestroy {
    exchangeRates$: BehaviorSubject<ExchangeRatesResponse> = this.exchangeRatesService.exchangeRates$;
    categories$: BehaviorSubject<Categories> = this.categoriesService.categories$;
    paymentCurrencyControl: FormControl = new FormControl(null);
    selectedCurrencyExchangeRate$: BehaviorSubject<string> = this.currencyAmountService.selectedCurrencyExchangeRate$;
    costs$: Observable<Cost[]> = this.categoriesService.categories$.pipe(map(( { costs }) => costs))
    unsubcribe$: Subject<void> = new Subject<void>();

    constructor(
        private activatedRoute: ActivatedRoute,
        private exchangeRatesService: ExchangeRatesService,
        private categoriesService: CategoriesService,
        private currencyAmountService: CurrencyAmountService
    ) {};

    ngOnInit(): void {       
        combineLatest([
            this.categoriesService.categories$,
            this.paymentCurrencyControl.valueChanges
        ]).pipe(
            takeUntil(this.unsubcribe$)
        ).subscribe(([categories, selectedPaymentCurrency]) => {
            const baseCurrencyExchangeRate = categories.baseCurrency.exchangeRate;
            const selectedCurrencyExchangeRate = selectedPaymentCurrency.exchangeRate;

            this.exchangeRatesService.selectedPaymentCurrency$.next(selectedPaymentCurrency);
            this.currencyAmountService.getBaseUsdExchangeRate(selectedCurrencyExchangeRate, baseCurrencyExchangeRate);
        });

        this.exchangeRatesService.exchangeRates$.next(this.activatedRoute.snapshot.data['exchangeRates']);
        this.categoriesService.categories$.next(this.activatedRoute.snapshot.data['categories']);
        
        this.paymentCurrencyControl.patchValue(this.exchangeRates$.getValue().paymentCurrencies.find(paymentCurrency => paymentCurrency.toCurrency === 'SGD'))
    }

    ngOnDestroy() {
        this.unsubcribe$.next();
        this.unsubcribe$.complete();

    }
}
