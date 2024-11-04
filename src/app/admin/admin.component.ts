import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  users: any[] = []; // Array para almacenar los usuarios
  emailToDelete: string = '';

  constructor(private http: HttpClient, private alertCtrl: AlertController, private router: Router) {
    this.loadUsers(); // Cargar usuarios al inicializar el componente
  }

  loadUsers() {
    this.http.get<any>('http://localhost/software_store_api/getUsers.php')
      .subscribe(data => {
        if (data.success) {
          this.users = data.data; // Asignar la lista de usuarios
        } else {
          console.error('Error al cargar usuarios:', data.message);
        }
      }, error => {
        console.error('Error en la petición:', error);
      });
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  async deleteUser() {
    if (!this.emailToDelete) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Por favor ingrese el correo electrónico del usuario a eliminar.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const userData = { email: this.emailToDelete };

    this.http.post('http://localhost/software_store_api/deleteUser.php', userData)
      .subscribe(async (response: any) => {
        if (response.success) {
          const alert = await this.alertCtrl.create({
            header: 'Éxito',
            message: 'Usuario eliminado correctamente.',
            buttons: ['OK']
          });
          await alert.present();
          this.emailToDelete = ''; // Limpiar el campo de entrada
          this.loadUsers(); // Recargar la lista de usuarios
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
