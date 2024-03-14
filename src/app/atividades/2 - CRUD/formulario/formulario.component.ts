import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pessoa } from '../crud.component';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  constructor(private http: HttpClient, private dialogRef: MatDialogRef<FormularioComponent>, @Inject(MAT_DIALOG_DATA) public data: Pessoa) { }

  form = new FormGroup({
    nome: new FormControl(this.data?.nome ? this.data.nome : "", [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    email: new FormControl(this.data?.email ? this.data.email : "", [Validators.required, Validators.email]),
    senha: new FormControl(this.data?.senha ? this.data.senha : "", [Validators.required]),
    cep: new FormControl(this.data?.cep ? this.data.cep : "", [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    logradouro: new FormControl(
      this.data?.logradouro ? this.data.logradouro : "",
      []),
  })

  ngOnInit(): void {
  }

  buscarCep(cep: string) {

    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get(url);
  }

  async submit() {
    if (this.form.invalid) {
      alert('invalid form');
    }
    this.buscarCep(this.form.value.cep).subscribe((res: any) => {
      if (res && !res.erro) {
        this.form.patchValue({ logradouro: res.logradouro })
        console.log(this.form.value)
        if (this.form.value.logradouro) {
          this.dialogRef.close(this.form.value)
        }
      } else {
        alert("Insira um cep valido")
      }
    });
  }
}


