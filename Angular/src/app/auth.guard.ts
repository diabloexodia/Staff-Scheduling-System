import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
   
    
    
    const token = sessionStorage.getItem('jwtToken');
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));

    if (tokenPayload && tokenPayload['role'] === 'admin') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
