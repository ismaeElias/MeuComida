import { Component } from '@angular/core';
import { UsuarioService} from 'src/app/services/usuario.service';
import {LoadingController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    
    usuario: Usuario[];

  constructor(private usuarioService : UsuarioService,
    private loadingController : LoadingController,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private router: Router) {}

  navegarRestaurante() {
    this.navController.navigateForward('restaurante');
  }
  
  navegarLogin() {
    this.router.navigate(['home/perfil'])
  } 
  
  async listar() {
    const loading = await this.loadingController.create({
      message: 'Carregando'
    });
    loading.present();
    // this.autores = this.autorService.getAutores();
    this.usuarioService.getUsuario().subscribe((data) => {
      this.usuario = data;
      loading.dismiss();
    });
  }
}
