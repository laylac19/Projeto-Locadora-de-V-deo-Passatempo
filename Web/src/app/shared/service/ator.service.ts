import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {AtorModel} from "../../model/ator.model";
import {AtorListModel} from "../../model/list/ator-list.model";
import {SelectItem} from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class AtorService {

    constructor(private http: HttpClient) {
    }

    resourceUrl = environment.apiUrl + '/atores';

    findAll(): Observable<AtorListModel[]> {
        return this.http.get<AtorListModel[]>(this.resourceUrl);
    }

    findCastMovie(idFilme: number):  Observable<SelectItem[]> {
        return this.http.get<SelectItem[]>(this.resourceUrl + '/atores-filme/' + idFilme);
    }

    findById(id: number): Observable<AtorModel> {
        return this.http.get<AtorModel>(this.resourceUrl + '/' + id);
    }

    fillDropdown(): Observable<SelectItem[]>{
        return this.http.get<SelectItem[]>(this.resourceUrl + '/dropdown')
    }

    insert(entity: AtorModel): Observable<AtorModel> {
        return this.http.post<AtorModel>(this.resourceUrl, entity);
    }

    update(entity: AtorModel): Observable<AtorModel> {
        return this.http.put<AtorModel>(this.resourceUrl, entity);
    }

    delete(id: number): Observable<AtorModel> {
        return this.http.delete<AtorModel>(this.resourceUrl + '/' + id);
    }

    withdrawActorFromCast(idAtor: number, idTitulo: number): Observable<AtorModel> {
        return this.http.delete<AtorModel>(this.resourceUrl + '/ator-titulo/' + idAtor + '/' + idTitulo);
    }
}
