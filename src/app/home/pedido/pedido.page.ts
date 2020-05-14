import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoadingController, NavController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos.service';
import { log } from 'util';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  usuario : Usuario;
  pedido : Pedidos[];
  total : number;
  

  constructor(private usuarioService : UsuarioService,
    private loadingController : LoadingController,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private alertController: AlertController,
    private toastController: ToastController,
    private pedidosService : PedidosService) { }

  async ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.params['id']);
    if(id) {
      // Carregar as informações
      const loading = await this.loadingController.create({message: 'Carregando', duration: 2000});
      loading.present();
      this.usuarioService.getUser(id).subscribe((user) => {
        this.usuario = user;
        this.pedidosService.getPedidos(this.usuario.usuario).subscribe((pedidos)=>{
          this.pedido = pedidos
          const valor = this.pedido.reduce((prev, elem)=> prev + elem.valor,0);
          this.total = parseInt(valor.toFixed(2));
          
        })
        loading.dismiss();
      });
    } 
    
  }
  
}
