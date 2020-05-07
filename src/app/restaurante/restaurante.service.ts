import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { filter, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  restaurantes: Restaurante;
  id: number;

  constructor(private httpClient: HttpClient, private loadingController: LoadingController,
    private navController: NavController) {
  }

  getRestaurantes() {
    return new Promise(resolve => {
      this.httpClient.get("http://localhost:3000/restaurante").subscribe(data => {
        resolve(data);
      },
        err => {
          console.log(err);
        });
    });
  }

  getRest(id: number) {
    return this.httpClient.get<Restaurante>(`http://localhost:3000/restaurante/${id}`);
  }

  adicionar(restaurante: Restaurante) {
    return this.httpClient.post<Restaurante>('http://localhost:3000/restaurante', restaurante);
  }

  salvar(restaurante: Restaurante) {
    return this.adicionar(restaurante);
  }

  excluir(restaurantes: Restaurante) {
    return this.httpClient.delete(`http://localhost:3000/restaurante/${this.restaurantes.id}`);
  }


  acessarDetalhe(id: number){ 
    return this.httpClient.get<Restaurante>(`http://localhost:3000/restaurante?id=${id}`).pipe(tap(
     (id: Restaurante) => this.restaurantes = id)
    )
 }

  obtemRestauranteAtual() {
    return this.restaurantes;
  }

}
