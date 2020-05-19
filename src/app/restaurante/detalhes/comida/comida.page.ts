import { Component, OnInit } from '@angular/core';
import { ComidaService } from './comida.service';
import { LoadingController, AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RestauranteService } from '../../restaurante.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-comida',
  templateUrl: './comida.page.html',
  styleUrls: ['./comida.page.scss'],
})
export class ComidaPage implements OnInit {

  public loader;

  restaurante: Restaurante;
  
  addButton: boolean;

  comida: Comida[];

  constructor(
    private comidaService: ComidaService,
    public loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    private restauranteService: RestauranteService,
    private navController: NavController,
    private usuarioService: UsuarioService,
    private router: Router,
    private _alertCtrl: AlertController) {
    this.restaurante = {
      razaoSocial: '',
      telefoneContato: '',
      detalhes: '',
      segmento: "Pizzaria",
      nivelValor: "medio",
      classificacao: 0, urlImagem: ''
    }
  }

  ionViewWillEnter() {
    this.getComida()
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

  getComida() {
    const id = parseInt(this.activatedRoute.snapshot.params['id']);
    const user = this.usuarioService.obtemUsuarioLogado();
    if(user){
      this.addButton = user[0].pessoaJuridica;
    }
    this.restauranteService.buscaRes(id).subscribe((data) => {
      this.restaurante = data
      this.comidaService.getComidaRestaurante(this.restaurante.id).subscribe((res) => {
        this.comida = res
      })
    });
  }

  async ngOnInit() {
    this.getComida()
  }
  navDetalhes() {
    this.router.navigate(['comida/detalhes'])
  }

}
