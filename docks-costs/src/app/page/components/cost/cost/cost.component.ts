import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, filter, startWith, takeUntil } from 'rxjs';
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

export class CostComponent implements OnInit, AfterViewInit  {
  @Input() cost: Cost;
  categories$: BehaviorSubject<Categories> = this.categoriesService.categories$;
  amountControl: FormControl = new FormControl(null);
  selectedPaymentCurrency$: BehaviorSubject<PaymentCurrency> = this.exchangeRateService.selectedPaymentCurrency$;
  
  screenedTotal: string;
  quotedTotal: string;
  totalQuotedInUsd: string = 'skhj';
  totalScreenedInUsd: string = 'sjhdhg';


  @ViewChildren('pojedynczyKomponent') public costItemComponentList: QueryList<CostItemComponent>

  constructor(
    private currencyAmountService: CurrencyAmountService,
    private categoriesService: CategoriesService,
    private exchangeRateService: ExchangeRatesService,
    ) { }
    
    ngOnInit() {
      combineLatest([
        this.amountControl.valueChanges,
        this.currencyAmountService.selectedCurrencyExchangeRate$
      ])
      .subscribe(([amount, selectedCurrencyExchangeRate]) => {
        console.log(this.currencyAmountService.getValueInUsd(amount, selectedCurrencyExchangeRate))
      });

    } 

    ngAfterViewInit(): void {
      this.costItemComponentList.forEach(item => {
        this.quotedTotal = this.costItemComponentList
        .map(item => item.quotedCost.amount)
        .reduce((a, b) => { return Decimal.add(a, b).toNumber().toFixed(2) }, '0')
console.log(this.currencyAmountService.selectedCurrencyExchangeRate$.getValue())
        this.totalQuotedInUsd = this.currencyAmountService.getValueInUsd(this.quotedTotal, this.currencyAmountService.selectedCurrencyExchangeRate$.getValue())

        combineLatest([
          this.currencyAmountService.selectedCurrencyExchangeRate$,
          item.screenedCostControl.valueChanges.pipe(startWith('0'))
        ]).pipe(
          // takeUntil(false)
        ).subscribe(([selectedCurrencyExchangeRate, value]) => {
          this.screenedTotal = this.costItemComponentList
            .map(item => item.screenedCostControl.value)
            .reduce((a, b) => { return Decimal.add(a, b).toNumber().toFixed(2) }, '0');

            this.totalScreenedInUsd = this.currencyAmountService.getValueInUsd(this.screenedTotal, selectedCurrencyExchangeRate);
        });

        this.currencyAmountService.selectedCurrencyExchangeRate$.pipe(
          // takeUntil(false)
        ).subscribe(selectedCurrencyExchangeRate => {
          this.totalQuotedInUsd = this.currencyAmountService.getValueInUsd(this.quotedTotal, selectedCurrencyExchangeRate);
        })
      })
    }
  }