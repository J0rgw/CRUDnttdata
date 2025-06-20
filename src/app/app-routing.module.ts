import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { HeroComponent } from './components/hero/hero.component';
import { TablasComponent } from './components/tablas/tablas.component';

const routes: Routes = [
  { path: '', component: HeroComponent },
  { path: 'form', component: FormComponent },
  { path: 'form/:id', component: FormComponent },
  { path: 'tablas', component: TablasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
