import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, combineLatest, Subject, takeUntil } from "rxjs";
import { OnlyNumberDirective } from "src/app/page/directives/only-number.directive";
import { Categories, CostItem, CostItemDetails } from "src/app/page/models/costs.config.interface";
import { PaymentCurrency } from "src/app/page/models/exchange-rates.config.interface";
import { CategoriesService } from "src/app/page/services/categories.service";
import { CurrencyAmountService } from "src/app/page/services/currency-amount.service";
import { ExchangeRatesService } from "src/app/page/services/exchange-rates.service";


@Component({
    selector: 'app-cost-item',
    templateUrl: './cost-item.component.html',
    styleUrls: ['./cost-item.component.scss']
})

export class CostItemComponent implements OnInit {
    faComment = faComment;
    screenedCostControl: FormControl = new FormControl(null);
    showMe: boolean = false;
    @Input() costItem: CostItem;
    categories$: BehaviorSubject<Categories> = this.categoriesService.categories$;
    unsubscribe$: Subject<void> = new Subject<void>

    screenedCost: CostItemDetails;
    quotedCost: CostItemDetails;

    screenedAmountInUSD: string;
    quotedAmountInUSD: string;

    selectedPaymentCurrency$: BehaviorSubject<PaymentCurrency> = this.exchangeRateService.selectedPaymentCurrency$

    constructor(
        private exchangeRateService: ExchangeRatesService,
        private categoriesService: CategoriesService,
        private currencyAmountService: CurrencyAmountService
        ) {}

    ngOnInit() {
        this.screenedCost =  this.costItem.costs.find(el => el.type === "Screened");
        this.quotedCost =  this.costItem.costs.find(el => el.type === "Quoted")

        combineLatest([
            this.currencyAmountService.selectedCurrencyExchangeRate$,
            this.screenedCostControl.valueChanges
        ]).pipe(
        takeUntil(this.unsubscribe$)
        ).subscribe(([selectedCurrencyExchangeRate, value]) => {
            this.quotedAmountInUSD = this.currencyAmountService.getValueInUsd(this.quotedCost.amount, selectedCurrencyExchangeRate)
            this.screenedAmountInUSD = this.currencyAmountService.getValueInUsd(value, selectedCurrencyExchangeRate)
        })
        
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    showComment() {
        this.showMe=!this.showMe;
      }


}