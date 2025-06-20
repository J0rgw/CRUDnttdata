import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './components/hero/hero.component';
import { FormComponent } from './components/form/form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
<<<<<<< HEAD
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TablasComponent } from './components/tablas/tablas.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
=======
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // o MatMomentDateModule si usas moment.js

>>>>>>> 714f462a06263ede2dc34ecab67e38a472b563bd

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    FormComponent,
    TablasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
<<<<<<< HEAD
    MatTableModule,
    MatSelectModule
=======
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule
>>>>>>> 714f462a06263ede2dc34ecab67e38a472b563bd
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
