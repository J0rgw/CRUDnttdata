/*import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  clientForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      revenue: [null, Validators.required],
      startDate: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      console.log('Cliente:', this.clientForm.value);
    } else {
      this.clientForm.markAllAsTouched();
    }
  }
}
*/
