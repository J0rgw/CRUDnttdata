import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.css']
})
export class TablasComponent implements OnInit {
  clientes: Cliente[] = [];
  filteredClientes: Cliente[] = [];
  paginatedClientes: Cliente[] = [];
  search: string = '';
  orderBy: keyof Cliente = 'name';
  orderDirection: string = 'asc';
  page: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchClientes();
  }

  fetchClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.applyFilter();
      },
      error: (err) => console.error('Error fetching clients:', err)
    });
  }

  applyFilter(): void {
    let filtered = this.clientes;
    if (this.search) {
      const searchLower = this.search.toLowerCase();
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchLower) ||
        c.contactEmail.toLowerCase().includes(searchLower)
      );
    }
    filtered = filtered.sort((a, b) => {
      let aValue = a[this.orderBy];
      let bValue = b[this.orderBy];
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();
      if (aValue < bValue) return this.orderDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return this.orderDirection === 'asc' ? 1 : -1;
      return 0;
    });
    this.filteredClientes = filtered;
    this.page = 1;
    this.updatePaginatedClientes();
  }

  updatePaginatedClientes(): void {
    this.totalPages = Math.ceil(this.filteredClientes.length / this.pageSize) || 1;
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedClientes = this.filteredClientes.slice(start, end);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.page = page;
    this.updatePaginatedClientes();
  }

  goToAddClient(): void {
    this.router.navigate(['/form']);
  }

  editClient(id: number): void {
    this.router.navigate(['/form', id]);
  }

  deleteClient(id: number): void {
    if (!confirm('¿Estás seguro de que deseas eliminar este cliente?')) return;
    this.clienteService.deleteCliente(id).subscribe({
      next: () => {
        this.clientes = this.clientes.filter(c => c.id !== id);
        this.applyFilter();
        alert('Cliente eliminado correctamente');
      },
      error: err => {
        alert('Error al eliminar cliente');
        console.error(err);
      }
    });
  }
}
