import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero.component/hero.component';
import { RegistroComponent } from './components/registro.component/registro.component';
import { InfoComponent } from './components/info.component/info.component'; 

export const routes: Routes = [
  { path: '', component: HeroComponent }, 
  { path: 'registro', component: RegistroComponent },
  { path: 'informacion', component: InfoComponent },
  { path: '**', redirectTo: '' } 
];