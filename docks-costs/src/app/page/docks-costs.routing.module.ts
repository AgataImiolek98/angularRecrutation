import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContainerComponent } from "./container/container.component";
import { CategoriesResolver } from "./resolvers/categories-resolver.service";
import { ExchangeRatesResolver } from "./resolvers/exchange-rates-resolver.service";

const routes: Routes = [
    {
        path: '',
        component: ContainerComponent,
        resolve: {
            exchangeRates: ExchangeRatesResolver,
            categories: CategoriesResolver,
        }
    }
]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DocksCostsRoutingModule { }