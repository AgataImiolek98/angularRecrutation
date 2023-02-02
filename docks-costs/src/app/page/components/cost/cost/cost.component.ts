import { AfterViewInit, Component, Input, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { BehaviorSubject, combineLatest, startWith, Subject, takeUntil } from 'rxjs';
import { Categories, Cost } from 'src/app/page/models/costs.config.interface';
import { PaymentCurrency } from 'src/app/page/models/exchange-rates.config.interface';
import { CategoriesService } from 'src/app/page/services/categories.service';
import { CurrencyAmountService } from 'src/app/page/services/currency-amount.service';
import { ExchangeRatesService } from 'src/app/page/services/exchange-rates.service';
import { CostItemComponent } from '../costItem/cost-item.component';
import Decimal from "decimal.js";

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.scss']
})

export class CostComponent implements AfterViewInit, OnDestroy  {
  @Input() cost: Cost;
  categories$: BehaviorSubject<Categories> = this.categoriesService.categories$;
  selectedPaymentCurrency$: BehaviorSubject<PaymentCurrency> = this.exchangeRateService.selectedPaymentCurrency$;
  
  screenedTotal: string;
  quotedTotal: string;
  totalQuotedInUsd: string;
  totalScreenedInUsd: string;

  unsubscribe$: Subject<void> = new Subject<void>()

  @ViewChildren('singleComponent') public costItemComponentList: QueryList<CostItemComponent>

  constructor(
    private currencyAmountService: CurrencyAmountService,
    private categoriesService: CategoriesService,
    private exchangeRateService: ExchangeRatesService,
    ) { }
    

    ngAfterViewInit(): void {
      this.costItemComponentList.forEach(item => {
        this.quotedTotal = this.costItemComponentList
        .map(item => item.quotedCost.amount)
        .reduce((a, b) => { return Decimal.add(a, b).toNumber().toFixed(2) }, '0')

        this.currencyAmountService.selectedCurrencyExchangeRate$.pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(selectedCurrencyExchangeRate => {
          this.totalQuotedInUsd = this.currencyAmountService.getValueInUsd(this.quotedTotal, selectedCurrencyExchangeRate);
        })

        combineLatest([
          this.currencyAmountService.selectedCurrencyExchangeRate$,
          item.screenedCostControl.valueChanges.pipe(startWith('0'))
        ]).pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(([selectedCurrencyExchangeRate, value]) => {
          this.screenedTotal = this.costItemComponentList
          .map(item => item.screenedCostControl.value)
          .reduce((a, b) => { return Decimal.add(a, b).toNumber().toFixed(2) }, '0');

          this.totalScreenedInUsd = this.currencyAmountService.getValueInUsd(this.screenedTotal, selectedCurrencyExchangeRate);
        });
      })
    }

    ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }
  }