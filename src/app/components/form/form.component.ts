import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
<<<<<<< HEAD
import { ClienteService } from '../../services/cliente.service';
=======
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
>>>>>>> 714f462a06263ede2dc34ecab67e38a472b563bd

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
<<<<<<< HEAD
  styleUrls: ['./form.component.css'],
=======
  styleUrls: ['./form.component.css']
>>>>>>> 714f462a06263ede2dc34ecab67e38a472b563bd
})
export class FormComponent implements OnInit {
  clientForm!: FormGroup;
  isEditMode = false;
  clientId?: number;

<<<<<<< HEAD
  constructor(private fb: FormBuilder, private clienteService: ClienteService) {}
=======
  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute
  ) {}
>>>>>>> 714f462a06263ede2dc34ecab67e38a472b563bd

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
<<<<<<< HEAD
      revenue: [null, [Validators.required, Validators.min(1)]]
=======
      revenue: [null, Validators.required],
      startDate: ['', Validators.required]
>>>>>>> 714f462a06263ede2dc34ecab67e38a472b563bd
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
<<<<<<< HEAD
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
=======
    if (this.clientForm.invalid) {
>>>>>>> 714f462a06263ede2dc34ecab67e38a472b563bd
      this.clientForm.markAllAsTouched();
      return;
    }

    const cliente: Cliente = this.clientForm.value;

    this.clienteService.createCliente(cliente).subscribe({
      next: () => {
        console.log('Cliente creado con éxito');
        this.clientForm.reset();
        this.clientForm.markAsPristine();
        this.clientForm.markAsUntouched();
      },
      error: err => {
        console.error('Error al crear cliente:', err);
      }
    });
  }

  updateClient(): void {
    if (this.clientForm.invalid || this.clientId == null) return;

    const cliente: Cliente = this.clientForm.value;

    this.clienteService.updateCliente(this.clientId, cliente).subscribe({
      next: () => {
        console.log('Cliente actualizado correctamente');
        this.clientForm.markAsPristine();
        this.clientForm.markAsUntouched();
      },
      error: err => {
        console.error('Error al actualizar cliente:', err);
      }
    });
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
