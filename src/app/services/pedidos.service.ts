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

  atualizaQtd(pedido : Pedidos){
    return this.httpClient.put<Pedidos>(`http://localhost:3000/pedidos/${pedido.id}`, pedido);
  }

  getPed(id : number){
    return this.httpClient.get<Pedidos>(`http://localhost:3000/pedidos/${id}`);
  }

  salvar(pedido : Pedidos){
    if (pedido && pedido.id) {
      return this.atualizaQtd(pedido);
    } else {
      return alert('não atualizou')
    } 
  }

  excluir(pedido: Pedidos) {
    return this.httpClient.delete(`http://localhost:3000/pedidos/${pedido.id}`);
  }
}
