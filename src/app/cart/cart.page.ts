import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage {
  cart: any[] = []; // Asegúrate de que este arreglo se inicialice correctamente

  constructor(private router: Router) {
    // Obtener el carrito de la navegación actual
    const navigation = this.router.getCurrentNavigation();

  }

  // Método para el proceso de pago
  checkout() {
    // Aquí puedes manejar el proceso de pago, redirigir o mostrar un mensaje
    alert('Proceso de pago iniciado');
    // Redirigir a otra página si es necesario
    // this.router.navigate(['/some-other-page']);
  }
}
