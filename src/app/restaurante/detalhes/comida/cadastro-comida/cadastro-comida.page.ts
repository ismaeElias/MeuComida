
import { NavController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ComidaService } from '../comida.service';


@Component({
  selector: 'app-cadastro-comida',
  templateUrl: './cadastro-comida.page.html',
  styleUrls: ['./cadastro-comida.page.scss'],
})
export class CadastroComidaPage implements OnInit {

  private comida: Comida;


  constructor(
    private comidaService: ComidaService,
    private loadingController: LoadingController,
    private navController: NavController
  ) {
    this.comida = {
      itens_composicao: '',
      nome: '', 
      restaurante: '',
      usuario: '',
      detalhes: '', 
      tipo: "Pizzaria",
      popularidade: '', 
      valor: 0,
      urlImagem: ''
    }
  }

  ngOnInit() {
  }

  async salvar() {
    let loading = await this.loadingController.create({ message: 'Salvando' });
    loading.present();

    this.comidaService.salvar(this.comida).subscribe(() => {
      loading.dismiss()
      this.navController.navigateForward(['/restaurante/detalhes/comida'])
    });
  }
}
