import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.css']
})
export class TablasComponent implements OnInit {
  clientes: Cliente[] = [];
  filteredClientes: Cliente[] = [];
  search: string = '';
  orderBy: keyof Cliente = 'name';
  orderDirection: string = 'asc';

  constructor(private clienteService: ClienteService) {}

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
  }
}
