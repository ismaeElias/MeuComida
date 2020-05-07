import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { RestauranteService } from '../restaurante.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})

export class DetalhesPage implements OnInit {
 
  restaurante : Restaurante;

  
  constructor(  private restauranteService: RestauranteService,
                private activatedRoute : ActivatedRoute,
                private router: Router,private loadingController : LoadingController) {
    this.restaurante = {
      razaoSocial: '',
      telefoneContato: '', 
      detalhes: '', 
      segmento: "Pizzaria", 
      nivelValor: "medio",
      classificacao: 0, urlImagem: ''
    }
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

