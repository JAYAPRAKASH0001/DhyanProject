import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); 

  if (typeof window !== 'undefined') {
    const isLoggedIn = !!localStorage.getItem('sessionUser'); 
    if (isLoggedIn) {
      return true; 
    } else {
      router.navigate(['/login']);
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};