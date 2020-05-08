import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoadingController } from '@ionic/angular';
import { RestauranteService } from 'src/app/restaurante/restaurante.service';

@Component({
  selector: 'app-cadastro-avaliacao',
  templateUrl: './cadastro-avaliacao.page.html',
  styleUrls: ['./cadastro-avaliacao.page.scss'],
})
export class CadastroAvaliacaoPage implements OnInit {

  avaliacao : Avaliacao;
  usuario : Usuario
  restaurante : Restaurante;

  constructor(private activatedRoute : ActivatedRoute,
              private restauranteService: RestauranteService,
              private loadingController : LoadingController,
              private usuarioService : UsuarioService) { 
    this.avaliacao = { nome:'',restaurante: '', comentario:'', nota:0 },
    this.usuario = {pessoaJuridica: false, nome : '',telefone :'',CPF:'',email:'',endereco:'',numResidencia : 0,bairro:'',usuario:'',senha:''}
    this.restaurante = {razaoSocial : '', telefoneContato: '',detalhes :'', segmento : '', nivelValor : '', classificacao : 0, urlImagem : ''}
  }

  async ngOnInit() {
    const id_res = parseInt(this.activatedRoute.snapshot.params['id']); 
    const a = this.usuarioService.obtemUsuarioLogado();
    const id = a[0].id;

    if(id) {
      // Carregar as informações
      const loading = await this.loadingController.create({message: 'Carregando', duration: 2000});
      loading.present();
      this.usuarioService.getUser(id).subscribe((user) => {
        this.usuario = user;
        loading.dismiss();
      });
    } 
    
    if(id_res){
      const loading = await this.loadingController.create({message: 'Carregando', duration: 2000});
      loading.present();
      this.restauranteService.buscaRes(id_res).subscribe((data) => {
        this.restaurante = data;
        loading.dismiss();
      });
    }
  }

}
