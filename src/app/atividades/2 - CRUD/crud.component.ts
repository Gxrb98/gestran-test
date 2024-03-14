import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { FormularioComponent } from './formulario/formulario.component';
import { FormControl } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  constructor(private dialog: MatDialog, private cdr: ChangeDetectorRef) { }

  filtro = new FormControl();
  displayedColumns: string[] = ['actions', 'nome', 'email', 'senha', 'cep', 'logradouro'];
  dataSource: { nome: string; email: string; senha: string; cep: string; logradouro: string; }[] = [
    { nome: "Teste1", email: "teste@email1.com", senha: "1234", cep: "80250104", logradouro: "Rua teste" }
  ];
  copyDataSource: { nome: string; email: string; senha: string; cep: string; logradouro: string; }[] = [];

  ngOnInit(): void {
    this.copyDataSource = [...this.dataSource]; // Inicializar copyDataSource con el dataSource original
    this.filtrar(); // Llamar al método de filtrado inicialmente
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  filtrar(): void {
    this.filtro.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => {
        if (searchTerm) {
          this.copyDataSource = this.dataSource.filter(item =>
            item.nome.toLowerCase().includes(searchTerm.toLowerCase())
          );
        } else {
          this.copyDataSource = [...this.dataSource];
        }
      });
  }

  adicionar(): void {
    this.dialog.open(FormularioComponent).afterClosed().subscribe((data: any) => {
      if (data) {
        this.dataSource.push(data); // Agregar el nuevo dato al dataSource original
        this.copyDataSource = [...this.dataSource]; // Actualizar el copyDataSource
      }
    });
  }

  editar(pessoa: any, index: number): void {
    this.dialog.open(FormularioComponent, { data: pessoa }).afterClosed().subscribe((data: any) => {
      if (data) {
        this.dataSource[index] = data; // Actualizar el dato en el dataSource original
        this.copyDataSource = [...this.dataSource]; // Actualizar el copyDataSource
      }
    });
  }

  remover(index: number): void {
    const pessoaRemovida = this.dataSource[index];
    if (!confirm(`Deseja remover a pessoa ${pessoaRemovida.nome}`)) return;
    this.dataSource.splice(index, 1); // Remover el elemento del dataSource original
    this.copyDataSource = [...this.dataSource]; // Actualizar el copyDataSource
    alert("removido com sucesso!");
  }
}


export class Pessoa {

  private readonly _nome: string;
  private readonly _email: string;
  private readonly _senha: string;
  private readonly _cep: string;
  private readonly _logradouro: string;

  constructor(nome: string, email: string, senha: string, cep: string, logradouro: string) {
    this._nome = nome;
    this._email = email;
    this._senha = senha;
    this._cep = cep;
    this._logradouro = logradouro;
  }

  get nome() {
    return this._nome;
  }

  get email() {
    return this._email;
  }

  get senha() {
    return this._senha;
  }
  get cep() {
    return this._cep;
  }
  get logradouro() {
    return this._logradouro;
  }
}



