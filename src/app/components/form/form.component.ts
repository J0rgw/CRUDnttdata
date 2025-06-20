import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  clientForm!: FormGroup;
  isEditMode = false;
  clientId?: number;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      revenue: [null, Validators.required],
      startDate: ['', Validators.required]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.clientId = +idParam;
      this.clienteService.getClienteById(this.clientId).subscribe(cliente => {
        this.clientForm.patchValue(cliente);
      });
    }
  }

  onSubmit(): void {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }

    const cliente: Cliente = this.clientForm.value;

    if (this.isEditMode && this.clientId) {
      this.clienteService.updateCliente(this.clientId, cliente).subscribe({
        next: () => {
          this.router.navigate(['/tablas']);
        },
        error: err => {
          console.error('Error al actualizar cliente:', err);
        }
      });
    } else {
      this.clienteService.createCliente(cliente).subscribe({
        next: () => {
          this.router.navigate(['/tablas']);
        },
        error: err => {
          console.error('Error al crear cliente:', err);
        }
      });
    }
  }

  deleteClient(): void {
    if (this.clientId == null) return;

    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      this.clienteService.deleteCliente(this.clientId).subscribe({
        next: () => {
          console.log('Cliente eliminado correctamente');
          this.clientForm.reset();
          this.clientForm.markAsPristine();
          this.clientForm.markAsUntouched();
        },
        error: err => {
          console.error('Error al eliminar cliente:', err);
        }
      });
    }
  }
} 
