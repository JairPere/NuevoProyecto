import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';

interface CheckoutSessionResponse {
  id: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products = [
    { name: 'Antivirus Pro', description: 'Protección avanzada para tu PC.', price: 50 },
    { name: 'Editor de Video', description: 'Software profesional de edición de video.', price: 120 },
    { name: 'Herramienta de Diseño', description: 'Diseño gráfico de calidad profesional.', price: 75 }
  ];
  cart: any[] = [];

  private stripe: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get('http://localhost/software_store_api/getProducts.php').subscribe((data: any) => {
      this.products = data;
    });
    this.initializeStripe();
  }

  initializeStripe() {
    loadStripe('pk_test_51QHNBLD6FcL1O0NLdrVjJXPPqivmcZmeQvAAZE0YrPHcHhSgUlUnlj7CefwuFnHjcBuh0ZUo2szdqrz6P7JkD9dX00Ge93q89i').then((stripe) => {
      this.stripe = stripe;
    });
  }

  addToCart(product: any) {
    this.cart.push(product);
    console.log('Carrito:', this.cart);
  }

  async checkout(product: any) {
    try {
      const response = await this.http.post<CheckoutSessionResponse>('http://localhost/software_store_api/createCheckoutSession.php', {
        price: product.price
      }).toPromise();

      // Verificar que response no sea undefined y tenga la propiedad id
      if (response && response.id) {
        const sessionId = response.id;

        // Redirigir a Stripe Checkout
        const result = await this.stripe.redirectToCheckout({ sessionId });

        if (result.error) {
          console.error(result.error.message);
        }
      } else {
        console.error('La sesión de pago no se creó correctamente.', response);
      }
    } catch (error) {
      console.error('Error al crear la sesión de pago:', error);
    }
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  viewCart() {
    this.router.navigate(['/cart'], {
      state: {
        cart: this.cart
      }
    });
  }
}
