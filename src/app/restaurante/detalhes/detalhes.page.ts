import { Component, OnInit ,HostBinding} from '@angular/core';
import { RestauranteService} from 'src/app/restaurante/restaurante.service';
import {LoadingController} from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController} from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})

export class DetalhesPage implements OnInit {

  restaurante: Restaurante;

  edit : boolean;
  hideMe: boolean;

  constructor(private restauranteService : RestauranteService,
              private loadingController : LoadingController,
              private activatedRoute : ActivatedRoute,
              private navController : NavController,
              private alertController: AlertController,
              private toastController: ToastController,
              private router: Router) { 
    this.restaurante = { razaoSocial : '',telefoneContato :'',detalhes:'',segmento:'',nivelValor:'',classificacao:0,urlImagem:''},
    this.edit = false;
  }

 async ngOnInit() {
  const a = this.restauranteService.obtemRestauranteAtual();
  const id = a[0].id;
    if(id) {
      // Carregar as informações
      const loading = await this.loadingController.create({message: 'Carregando', duration: 2000});
      loading.present();
      this.restauranteService.getRest(id).subscribe((rest) => {
        this.restaurante = rest;
        loading.dismiss();
      });
    } 
  }

  navegarComida(){
    this.router.navigate(['restaurante/detalhes/comida'])
  }
  navegarAvalicao(){
    this.router.navigate(['restaurante/detalhes/avaliacao'])
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
    this.restauranteService.salvar(this.restaurante).subscribe(() => { 
      loading.dismiss();
      this.ngOnInit();
    });
  }

  async confirmarExclusao(restaurante: Restaurante) {

    let alerta = await this.alertController.create({
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
}

