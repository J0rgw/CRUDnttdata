import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  
})
export class FormComponent implements OnInit {

  clientForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      console.log('Formulario enviado:', this.clientForm.value);
      // Lógica para enviar los datos a la API
    } else {
      this.clientForm.markAllAsTouched();
    }
  }
}
