import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {TituloModel} from "../../model/titulo.model";
import {VinculoEntidades} from "../../model/vinculo-entidade.model";
import {LocacaoListModel} from "../../model/list/locacao-list.model";
import {LocacaoModel} from "../../model/locacao.model";

@Injectable({
    providedIn: 'root'
})
export class LocacaoService {

    constructor(private http: HttpClient) {
    }

    resourceUrl = environment.apiUrl + '/locacao';

    findAll(): Observable<LocacaoListModel[]> {
        return this.http.get<LocacaoListModel[]>(this.resourceUrl);
    }

    findById(id: number): Observable<LocacaoModel> {
        return this.http.get<LocacaoModel>(this.resourceUrl + '/' + id);
    }

    insert(entity: LocacaoModel): Observable<LocacaoModel> {
        return this.http.post<LocacaoModel>(this.resourceUrl, entity);
    }

    insertItemOnLease(vinculo: VinculoEntidades): Observable<LocacaoModel> {
        return this.http.post<LocacaoModel>(this.resourceUrl + '/item-locacao', vinculo);
    }

    update(entity: TituloModel): Observable<LocacaoModel> {
        return this.http.put<LocacaoModel>(this.resourceUrl, entity);
    }

    delete(id: number): Observable<LocacaoModel> {
        return this.http.delete<LocacaoModel>(this.resourceUrl + '/' + id);
    }
}
