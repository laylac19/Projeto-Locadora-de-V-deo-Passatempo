import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {TituloListModel} from "../../model/list/titulo-list.model";
import {TituloModel} from "../../model/titulo.model";
import {SelectItem} from "primeng/api";
import {VinculoEntidades} from "../../model/vinculo-entidade.model";

@Injectable({
    providedIn: 'root'
})
export class TituloService {

    constructor(private http: HttpClient) {
    }

    resourceUrl = environment.apiUrl + '/titulos';

    findAll(): Observable<TituloListModel[]> {
        return this.http.get<TituloListModel[]>(this.resourceUrl);
    }

    findById(id: number): Observable<TituloModel> {
        return this.http.get<TituloModel>(this.resourceUrl + '/' + id);
    }

    fillDropdown(): Observable<SelectItem[]>{
        return this.http.get<SelectItem[]>(this.resourceUrl + '/dropdown')
    }

    fillMovieCategoryDropdown(): Observable<SelectItem[]>{
        return this.http.get<SelectItem[]>(this.resourceUrl + '/dropdown-categoria')
    }

    insert(entity: TituloModel): Observable<TituloModel> {
        return this.http.post<TituloModel>(this.resourceUrl, entity);
    }

    insertCastMovie(vinculo: VinculoEntidades): Observable<TituloModel> {
        return this.http.post<TituloModel>(this.resourceUrl + '/ator-titulo', vinculo);
    }

    update(entity: TituloModel): Observable<TituloModel> {
        return this.http.put<TituloModel>(this.resourceUrl, entity);
    }

    delete(id: number): Observable<TituloModel> {
        return this.http.delete<TituloModel>(this.resourceUrl + '/' + id);
    }
}
