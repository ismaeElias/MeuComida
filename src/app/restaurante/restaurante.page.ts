import { Component, OnInit } from '@angular/core';
import { RestauranteService } from './restaurante.service';
import { LoadingController, AlertController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.page.html',
  styleUrls: ['./restaurante.page.scss'],
})
export class RestaurantePage implements OnInit {

  private restaurantes: any;
  edit : boolean;
  hideMe: boolean;
  public loader;

  constructor(
    private restauranteService: RestauranteService,
    public loadingController: LoadingController,
    private navController: NavController,
    private router: Router,
    private alertCtrl: AlertController,
    private toastController: ToastController) {
    this.getRestaurantes();
  }

  getRestaurantes() {
    this.restauranteService.getRestaurantes()
      .then(data => {
        this.restaurantes = data;
      });
  }

  showLoading() {
    this.loadingController
      .create({
        message: 'Aguarde...',
        spinner: "crescent"
      })
      .then((loading) => {
        loading.present();
        setTimeout(() => loading.dismiss(), 1000);
      });
  }

  editar(){
    this.edit = true;
    this.hideMe = true;
  }

  async salvarEdicao(){
    this.edit = false;
    this.hideMe = false;
    let loading = await this.loadingController.create({message:'Salvando'});
    loading.present();
    this.restauranteService.salvar(this.restaurantes).subscribe(() => { 
      loading.dismiss();
      this.ngOnInit();
    });
  }

  async confirmarExclusao(restaurante: Restaurante) {

    let alerta = await this.alertCtrl.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o restaurante ${restaurante.razaoSocial}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(restaurante);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  excluir(restaurante: Restaurante) {
    this.restauranteService.excluir(restaurante).subscribe( async () => {
      this.navController.navigateForward(['/restaurante'])  
        const toast = await this.toastController.create({
          message: 'Restaurante excluído com sucesso!',
          duration: 2000
        });
        toast.present();
    });
  }

  sair(){
    this.navController.navigateForward(['/restaurante']);
  }

  ngOnInit(){}

  navDetalhes(){
    this.router.navigate(['restaurante/detalhes'])
  }

}
