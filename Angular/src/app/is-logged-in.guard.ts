import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // This makes the guard available application-wide
 })
export class isLoggedInGuard implements CanActivate {


  constructor(private router: Router) {}
  canActivate(): boolean {


  if (!sessionStorage.getItem('jwtToken')) {
    this.router.navigate(['/login']);
    return false;
  }
  return true;
}
}
