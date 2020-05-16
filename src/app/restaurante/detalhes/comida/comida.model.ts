export class Comida {

    static contador = 1;

    public id: number;
    public nome: string;
    public itens_composicao: string;
    public restaurante: string;
    public usuario: string;
    public detalhes: string;
    public tipo: string;
    public popularidade: string;
    public valor: number;
    public urlImagem: string;

    constructor(nome = '', itens_composicao: '', usuario: '', restaurante: '',detalhes = '', tipo = '', popularidade = '', valor = 0, urlImagem = '') {
        this.id = Comida.contador++;
        this.itens_composicao = itens_composicao;
        this.nome = nome;
        this.detalhes = detalhes;
        this.restaurante= restaurante;
        this.usuario = usuario;
        this.tipo = tipo;
        this.popularidade = popularidade;
        this.valor = valor;
        this.urlImagem = urlImagem;
    }

    
}
