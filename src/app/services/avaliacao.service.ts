import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import {LoadingController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { filter, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {


  constructor(private httpClient : HttpClient,
              private loadingController : LoadingController,
              private navController : NavController) { }

  getAvaliacao() {
    return this.httpClient.get<Avaliacao[]>('http://localhost:3000/avaliacao');
  }

  getAval(id:number){
    return this.httpClient.get<Avaliacao>(`http://localhost:3000/avaliacao/${id}`);
  }

  getAvaliacaoRestaurante(res: String){
    return this.httpClient.get<Avaliacao[]>(`http://localhost:3000/avaliacao?restaurante=${res}`);
  }

}
