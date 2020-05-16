import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, AlertController, ToastController } from '@ionic/angular';
import { ComidaService } from '../comida.service';
import { RestauranteService } from 'src/app/restaurante/restaurante.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
 
  comida : Comida;

  editButton: boolean;
  edit : boolean;
  hideMe: boolean;

  
  constructor(  private comidaService: ComidaService,
                private restauranteService: RestauranteService,
                private activatedRoute : ActivatedRoute,
                private router: Router,
                private loadingController : LoadingController,
                private navController : NavController,
                private alertController: AlertController,
                private toastController : ToastController) {
      this.comida = {
        itens_composicao: '',
        nome: '', 
        
        usuario:'',
        detalhes: '', 
        tipo: "Pizzaria",
        popularidade: 0, 
        valor: 0,
        urlImagem: ''
      }
   }


  async ngOnInit() {
    this.editButton = true;
    const id = parseInt(this.activatedRoute.snapshot.params['id']);     
    if(id) {
      // Carregar as informações
      const loading = await this.loadingController.create({message: 'Carregando'});
      loading.present();
      this.comidaService.buscaComida(id).subscribe((comida) => {
        this.comida = comida;
        loading.dismiss();
      });
    } 
  }

  editar(){
    this.edit = true;
    this.hideMe = true;
    this.editButton = false;
  }

  async salvarEdicao(){
    const restaurante= this.restauranteService.obtemRestauranteLogado();
    this.edit = false;
    this.hideMe = false;
    let loading = await this.loadingController.create({message:'Salvando'});
    loading.present();
    this.comidaService.salvar(this.comida).subscribe(() => {loading.dismiss();this.ngOnInit();});

    this.navController.navigateForward(['restaurante/detalhes/comida/'+restaurante.id])
  }

  async confirmarExclusao(comida: Comida) {

    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o comida ${comida.nome}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(comida);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  excluir(comida: Comida) {

    const restaurante= this.restauranteService.obtemRestauranteLogado();

    this.comidaService.excluir(comida).subscribe( async () => {
      this.navController.navigateForward(['restaurante/detalhes/comida/'+restaurante.id])
        const toast = await this.toastController.create({
          message: 'Comida excluída com sucesso!',
          duration: 2000
        });
       
        toast.present();
        
    });
  }

  sair(){
    this.navController.navigateForward(['/detalhes']);
  }

}
