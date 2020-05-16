import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, AlertController, ToastController } from '@ionic/angular';
import { ComidaService } from '../comida.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
 
  comida : Comida;

  
  edit : boolean;
  hideMe: boolean;

  
  constructor(  private comidaService: ComidaService,
                private activatedRoute : ActivatedRoute,
                private router: Router,
                private loadingController : LoadingController,
                private navController : NavController,
                private alertController: AlertController,
                private toastController : ToastController) {
      this.comida = {
        itens_composicao: '',
        nome: '', 
        restaurante: '',
        usuario:'',
        detalhes: '', 
        tipo: "Pizzaria",
        popularidade: '', 
        valor: 0,
        urlImagem: ''
      }
   }


  async ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.params['id']);     /*  
    if(id) {
      // Carregar as informações
      const loading = await this.loadingController.create({message: 'Carregando'});
      loading.present();
      this.comidaService.buscaComida(id).subscribe((comida) => {
        this.comida = comida;
        loading.dismiss();
      });
    } */
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
    this.comidaService.salvar(this.comida).subscribe(() => {loading.dismiss();this.ngOnInit();});
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
    this.comidaService.excluir(comida).subscribe( async () => {
      this.navController.navigateForward(['/comida'])  
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
