import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { ContainerComponent } from "./container/container.component";

const routes: Routes = [
    {
        path: '',
        component: ContainerComponent
    }
]

@NgModule ({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DocksCostsRoutingModule { }