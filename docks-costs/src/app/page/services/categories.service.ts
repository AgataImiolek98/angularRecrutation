import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { Categories, CommentDetails, Cost, CostItem } from "../models/costs.config.interface";

@Injectable({
    providedIn: 'root'
})

export class CategoriesService {
    categories$: BehaviorSubject<Categories> = new BehaviorSubject<Categories>(null);
    costItems$: BehaviorSubject<CostItem>= new BehaviorSubject<CostItem>(null);
    cost$: BehaviorSubject<Cost> = new BehaviorSubject<Cost>(null);
    comments$: BehaviorSubject<CommentDetails> = new BehaviorSubject<CommentDetails>(null);

    constructor (private http: HttpClient) {}

    getCategoriesData(): Observable<Categories> {
        return this.http.get<Categories>('../../../assets/categories.json')
    }  
}