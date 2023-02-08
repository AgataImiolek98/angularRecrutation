import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CostComponent } from "./components/cost/cost/cost.component";
import { ContainerComponent } from "./container/container.component";
import { DocksCostsRoutingModule } from "./docks-costs.routing.module";
import { HttpClientModule } from "@angular/common/http";
import { CommentComponent } from "./components/cost/comment/comment.component";
import { CostItemComponent } from "./components/cost/costItem/cost-item.component";
import { OnlyNumberDirective } from "./directives/only-number.directive";


@NgModule ({
    declarations: [
        ContainerComponent,
        CostComponent,
        CostItemComponent,
        CommentComponent,
        OnlyNumberDirective
    ],
    imports: [
        DocksCostsRoutingModule,
        FontAwesomeModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
    ]
})

export class DocksCostsModule {}