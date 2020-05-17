
import { NavController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ComidaService } from '../comida.service';
import { RestauranteService } from 'src/app/restaurante/restaurante.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastro-comida',
  templateUrl: './cadastro-comida.page.html',
  styleUrls: ['./cadastro-comida.page.scss'],
})
export class CadastroComidaPage implements OnInit {

  private comida: Comida;
  private restaurante: Restaurante;

  constructor(
    private comidaService: ComidaService,
    private loadingController: LoadingController,
    private restauranteService: RestauranteService,
    private router : Router,
    private navController: NavController
  ) {
    this.restaurante= this.restauranteService.obtemRestauranteLogado();
    
    
    this.comida = {
      restauranteId :this.restaurante.id,
      itens_composicao: '',
      nome: '', 
      usuario: '',
      detalhes: '', 
      tipo: "Pizzaria",
      popularidade: 0, 
      valor: 0,
      urlImagem: ''
    }

    this.comida.restauranteId = this.restaurante.id; 
  }

  ngOnInit() {
  }

  async salvar(){
    let loading = await this.loadingController.create({message:'Salvando'});
    loading.present();
    this.comidaService.salvar(this.comida).subscribe(() => { 
      // const buscaRes = this.restauranteService.obtemRestauranteLogado();
      this.router.navigate(['restaurante/detalhes/comida/',this.restaurante.id]);
      loading.dismiss() 
    });
   }
}
