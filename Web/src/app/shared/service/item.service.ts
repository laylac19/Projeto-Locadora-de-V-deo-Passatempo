import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ItemModel} from "../../model/item.model";
import {ItemListModel} from "../../model/list/item-list.model";
import {SelectItem} from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    constructor(private http: HttpClient) {
    }

    resourceUrl = environment.apiUrl + '/itens';

    findAll(): Observable<ItemListModel[]> {
        return this.http.get<ItemListModel[]>(this.resourceUrl);
    }

    findById(id: number): Observable<ItemModel> {
        return this.http.get<ItemModel>(this.resourceUrl + '/' + id);
    }

    fillTypeCategoryItenDropdown(): Observable<SelectItem[]> {
        return this.http.get<SelectItem[]>(this.resourceUrl + '/dropdown-tipo-item')
    }

    fillAvailableItensDropdown(): Observable<SelectItem[]>{
        return this.http.get<SelectItem[]>(this.resourceUrl + '/dropdown')
    }

    valueOfItemLease(id: number): Observable<number[]>{
        return this.http.get<number[]>(this.resourceUrl + '/valorItem' + '/' + id)
    }

    insert(entity: ItemModel): Observable<ItemModel> {
        return this.http.post<ItemModel>(this.resourceUrl, entity);
    }

    update(entity: ItemModel): Observable<ItemModel> {
        return this.http.put<ItemModel>(this.resourceUrl, entity);
    }

    delete(id: number): Observable<ItemModel> {
        return this.http.delete<ItemModel>(this.resourceUrl + '/' + id);
    }
}
