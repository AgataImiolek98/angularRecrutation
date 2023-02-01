import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ExchangeRatesResponse } from "../models/exchange-rates.config.interface";
import { ExchangeRatesService } from "../services/exchange-rates.service";

@Injectable({
    providedIn: 'root'
})

export class ExchangeRatesResolver implements Resolve<any> {
    constructor (private exchangeRatesService: ExchangeRatesService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ExchangeRatesResponse> {
        return this.exchangeRatesService.getExchangeRatesData();         
    }

}