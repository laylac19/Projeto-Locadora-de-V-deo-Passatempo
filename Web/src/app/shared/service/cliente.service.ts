import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

import {SelectItem} from "primeng/api";
import {ClienteListModel} from "../../model/list/cliente-list.model";
import {ClienteModel} from "../../model/cliente.model";
import {SocioListModel} from "../../model/list/socio-list.model";
import {VinculoEntidades} from "../../model/vinculo-entidade.model";
import {SocioModel} from "../../model/socio.model";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

    constructor(private http: HttpClient) {
    }

    resourceUrl = environment.apiUrl + '/cliente';

    findAllActive(): Observable<ClienteListModel[]> {
        return this.http.get<ClienteListModel[]>(this.resourceUrl);
    }

    findAllDependents(status: boolean): Observable<ClienteListModel[]> {
        return this.http.get<ClienteListModel[]>(this.resourceUrl + '/dependentes/' + status);
    }

    findAllPartners(status: boolean): Observable<SocioListModel[]> {
        return this.http.get<SocioListModel[]>(this.resourceUrl + '/socios/' + status);
    }

    findById(id: number): Observable<ClienteModel> {
        return this.http.get<ClienteModel>(this.resourceUrl + '/' + id);
    }

    findDependentsOfPartner(idSocio: number):  Observable<SelectItem[]> {
        return this.http.get<SelectItem[]>(this.resourceUrl + '/dependentes-socio/' + idSocio);
    }

    fillClientsDropDown(): Observable<SelectItem[]> {
        return this.http.get<SelectItem[]>(this.resourceUrl + '/dropdown')
    }

    fillNonPartnersCustomersDropdown(): Observable<SelectItem[]>{
        return this.http.get<SelectItem[]>(this.resourceUrl + '/clientes/dropdown')
    }

    fillDropDownLease(): Observable<SelectItem[]>{
        return this.http.get<SelectItem[]>(this.resourceUrl + '/dropdown/locacao')
    }

    insertDependent(vinculo: VinculoEntidades): Observable<ClienteModel> {
        return this.http.post<ClienteModel>(this.resourceUrl + '/salvar-dependente', vinculo);
    }

    insert(entity: ClienteModel): Observable<ClienteModel> {
        return this.http.post<ClienteModel>(this.resourceUrl, entity);
    }

    savePartners(entity: SocioModel): Observable<SocioModel> {
        return this.http.post<SocioModel>(this.resourceUrl + '/socio', entity);
    }

    update(entity: ClienteModel): Observable<ClienteModel> {
        return this.http.put<ClienteModel>(this.resourceUrl, entity);
    }

    delete(id: number): Observable<ClienteModel> {
        return this.http.delete<ClienteModel>(this.resourceUrl + '/' + id);
    }
}
