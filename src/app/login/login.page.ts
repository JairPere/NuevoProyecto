import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private alertCtrl: AlertController, private router: Router) {}

  async login() {
    // Validación de campos vacíos
    if (!this.email && !this.password) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Por favor ingrese su correo electrónico y contraseña.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    if (!this.password) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Por favor ingrese su contraseña.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (!this.email) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Por favor ingrese su correo electrónico.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const userData = {
      email: this.email,
      password: this.password
    };
    this.http.post('http://localhost/software_store_api/loginUser.php', userData)
      .subscribe(async (response: any) => {
        if (response.success) {
          localStorage.setItem('isLoggedIn', 'true');

          // Redirigir dependiendo del correo electrónico
          if (this.email === 'Diego77605@hotmail.com') {
            this.router.navigate(['/admin']); // Página especial para eliminar usuarios
          } else {
            this.router.navigate(['/products']); // Página normal para otros usuarios
          }

          const alert = await this.alertCtrl.create({
            header: 'Éxito',
            message: 'Inicio de sesión correcto.',
            buttons: ['OK']
          });
          await alert.present();
        } else {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: response.message,
            buttons: ['OK']
          });
          await alert.present();
        }
      });
  }

  ionViewWillEnter() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.router.navigate(['/products']);
    }
  }
}
