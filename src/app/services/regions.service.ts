import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  private _Regions = 'assets/listregionsdakar.json';

  constructor(private http: HttpClient) { }

  getRegions(): Observable <any>{
    return this.http.get<Data>(this._Regions)
  }
}



export interface Data {
  regions: Region[];
}

export interface Region {
  nom:          string;
  departements: Departement[];
}

export interface Departement {
  nom:             string;
  arrondissements: Arrondissement[];
}

export interface Arrondissement {
  nom:      string;
  communes: Commune[];
}

export interface Commune {
  nom: string;
}