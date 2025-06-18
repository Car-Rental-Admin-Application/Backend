import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin',
    loadChildren: () => import('./admin/routes'),
    canActivate: [authGuard] // Protect all admin routes
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
