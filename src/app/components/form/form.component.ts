import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  clientForm!: FormGroup;

  constructor(private fb: FormBuilder, private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      revenue: [null, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const formValue = this.clientForm.value;
      const payload = {
        ...formValue,
        startDate: new Date().toISOString()
      };
      this.clienteService.createCliente(payload)
        .subscribe({
          next: (res) => console.log('Usuario creado:', res),
          error: (err) => console.error('Error al crear usuario:', err)
        });
    } else {
      this.clientForm.markAllAsTouched();
    }
  }
}
