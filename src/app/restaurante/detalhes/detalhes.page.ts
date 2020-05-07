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
    const id = parseInt(this.activatedRoute.snapshot.params['id']);       
    if(id) {
      // Carregar as informações
      const loading = await this.loadingController.create({message: 'Carregando'});
      loading.present();
      this.restauranteService.buscaRes(id).subscribe((restaurante) => {
        this.restaurante = restaurante;
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
}
