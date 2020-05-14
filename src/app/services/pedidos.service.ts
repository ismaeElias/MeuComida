import { Injectable } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  
  pedido : Pedidos;

  constructor(  private httpClient : HttpClient,
                private loadingController : LoadingController,
                private navController : NavController) { }


  getPedidos(user) {
    return this.httpClient.get<Pedidos[]>(`http://localhost:3000/pedidos?usuario=${user}`);
  }
}
