import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-a1.5-classe',
  templateUrl: './a1.5-classe.component.html',
  styleUrls: ['./a1.5-classe.component.scss']
})
export class A15ClasseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const livro = new Livro("La llorona", "Yo", 2007, "ISBN");
    console.log(livro.descricao())

    const periodico = new Periodico("BBC", "Michael Jordan", 2030, "ISSN");
    console.log(periodico.descricao())
  }

}

class Publicacao {
  private readonly _titulo: string;
  private readonly _autor: string;
  private readonly _anoPublicacao: number;

  constructor(titulo: string, autor: string, anoPublicacao: number) {
    this._titulo = titulo;
    this._autor = autor;
    this._anoPublicacao = anoPublicacao;
  }


  public get titulo(): string {
    return this._titulo;
  }

  public get autor(): string {
    return this._autor;
  }

  public get anoPublicacao(): number {
    return this._anoPublicacao;
  }

  descricao(): string {
    return `Título: ${this._titulo}, Autor: ${this._autor}, Ano de Publicação: ${this._anoPublicacao}`
  }
}

class Livro extends Publicacao {
  private readonly _ISBN: string;

  constructor(titulo: string, autor: string, anoPublicacao: number, ISBN: string) {
    super(titulo, autor, anoPublicacao);
    this._ISBN = ISBN;
  }


  public get ISBN(): string {
    return this._ISBN;
  }

  descricao(): string {
    return `${super.descricao()}, ISBN:${this._ISBN}`
  }
}

class Periodico extends Publicacao {
  private readonly _ISSN: string;

  constructor(titulo: string, autor: string, anoPublicacao: number, ISSN: string) {
    super(titulo, autor, anoPublicacao);
    this._ISSN = ISSN;
  }

  public get ISSN(): string {
    return this._ISSN;
  }

  descricao(): string {
    return `${super.descricao()}, ISSN:${this._ISSN}`
  }

}