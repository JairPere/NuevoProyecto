import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = ''; // Inicializa en vacío
  password: string = ''; // Inicializa en vacío
  confirmPassword: string = '';

  constructor(private http: HttpClient, private alertCtrl: AlertController) {}

  async register() {
    // Validar campos vacíos
    if (!this.email || !this.password || !this.confirmPassword) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Por favor, completa todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Validar formato del correo electrónico
    if (!this.email.includes('@')) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'El correo electrónico debe contener un "@".',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Validar que las contraseñas coinciden
    if (this.password !== this.confirmPassword) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const userData = {
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost/software_store_api/registerUser.php', userData)
      .subscribe(async (response: any) => {
        if (response.success) {
          const alert = await this.alertCtrl.create({
            header: 'Éxito',
            message: 'Usuario registrado correctamente.',
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
}
