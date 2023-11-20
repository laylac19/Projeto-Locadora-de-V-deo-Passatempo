import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {DiretorModel} from "../../model/diretor.model";
import {Observable} from "rxjs";
import {DiretorListModel} from "../../model/list/diretor-list.model";
import {SelectItem} from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class DiretorService {

    constructor(private http: HttpClient) {
    }

    resourceUrl = environment.apiUrl + '/diretores';

    findAll(): Observable<DiretorListModel[]> {
        return this.http.get<DiretorListModel[]>(this.resourceUrl);
    }

    findById(id: number): Observable<DiretorModel> {
        return this.http.get<DiretorModel>(this.resourceUrl + '/' + id);
    }

    fillDropdown(): Observable<SelectItem[]>{
        return this.http.get<SelectItem[]>(this.resourceUrl + '/dropdown')
    }

    insert(entity: DiretorModel): Observable<DiretorModel> {
        return this.http.post<DiretorModel>(this.resourceUrl, entity);
    }

    update(entity: DiretorModel): Observable<DiretorModel> {
        return this.http.put<DiretorModel>(this.resourceUrl, entity);
    }

    delete(id: number): Observable<DiretorModel> {
        return this.http.delete<DiretorModel>(this.resourceUrl + '/' + id);
    }
}
