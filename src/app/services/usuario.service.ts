import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import {LoadingController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { filter, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/do'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _usuarioLogado : Usuario;  
  usuarios : Usuario;
 id :number;
  
  constructor( private httpClient : HttpClient,private loadingController : LoadingController,
    private navController : NavController) { }

  getUsuario() {
    return this.httpClient.get<Usuario[]>('http://localhost:3000/usuario');
  }

  adicionar(usuario: Usuario) {
    return this.httpClient.post<Usuario>('http://localhost:3000/usuario',usuario);
  }

  salvar(usuario: Usuario) {
      return this.adicionar(usuario);
  }

  
  efetuaLogin(user :String,password : String){ 
     return this.httpClient.get<Usuario>(`http://localhost:3000/usuario?usuario=${user}&senha=${password}`);
  }

  obtemUsuarioLogado() {
  return  this.id;
   
}
}
