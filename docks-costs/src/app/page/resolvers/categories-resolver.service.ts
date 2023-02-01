import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { Categories } from "../models/costs.config.interface";
import { CategoriesService } from "../services/categories.service";

@Injectable({
    providedIn: 'root'
})

export class CategoriesResolver implements Resolve<Categories> {
    constructor(private categoriesService: CategoriesService) {}

    resolve(): Observable<Categories> { 
        return this.categoriesService.getCategoriesData();
    }
}