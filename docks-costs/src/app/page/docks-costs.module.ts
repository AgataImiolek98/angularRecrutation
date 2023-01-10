import { NgModule } from "@angular/core";
import { CostComponent } from "./components/cost/cost.component";
import { ContainerComponent } from "./container/container.component";
import { DocksCostsRoutingModule } from "./docks-costs.routing.module";

@NgModule ({
    declarations: [
        ContainerComponent,
        CostComponent,
    ],
    imports: [
        DocksCostsRoutingModule,
    ]
})

export class DocksCostsModule {}