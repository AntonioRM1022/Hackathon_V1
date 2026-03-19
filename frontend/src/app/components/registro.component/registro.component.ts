import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import emailjs from '@emailjs/browser';
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RecaptchaModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit, OnDestroy {
  registro = {
    nombre_equipo: '',
    correo: '',
    especialidad: ''
  };
  opciones = ['Ciberseguridad', 'Redes Neuronales', 'Arqueo Cuántico', 'Núcleo Backend'];
  listaEquipos: any[] = [];
  mostrarModal = false;
  nombreEquipoRegistrado = '';
  captchaToken: string | null = null;

  days = 0; hours = 0; minutes = 0; seconds = 0;
 
  tiempoSesion: number = 90; 
  formularioBloqueado: boolean = false;
  
  private timerInterval: any;
  private sessionInterval: any;
  private apiUrl = 'https://hackathon-backend-u9kp.onrender.com/api/v1';

  constructor(private http: HttpClient) {}

  ngOnInit() { 
    this.startCountdown();
    this.startSessionTimer(); 
    this.obtenerEscuadrones();
  }

  ngOnDestroy() { 
    if (this.timerInterval) clearInterval(this.timerInterval); 
    if (this.sessionInterval) clearInterval(this.sessionInterval);
  }

  startSessionTimer() {
    this.sessionInterval = setInterval(() => {
      if (this.tiempoSesion > 0) {
        this.tiempoSesion--;
      } else {
        this.formularioBloqueado = true;
        clearInterval(this.sessionInterval);
      }
    }, 1000);
  }



get formatearTiempoSesion(): string {
  const min = Math.floor(this.tiempoSesion / 60);
  const sec = this.tiempoSesion % 60;
  
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

  resolved(token: string | null) {
    this.captchaToken = token;
  }

  obtenerEscuadrones() {
    this.http.get<any[]>(`${this.apiUrl}/lista`).subscribe({
      next: (data) => this.listaEquipos = data,
      error: (err) => console.error('Error al sincronizar lista:', err)
    });
  }

  seleccionarEspecialidad(opcion: string) {
    this.registro.especialidad = opcion;
  }

  validarFormulario(): boolean {
    const { nombre_equipo, correo, especialidad } = this.registro;
    if (!nombre_equipo.trim() || !correo.trim() || !especialidad) {
      alert('PROTOCOLO INCOMPLETO: Debes llenar todos los campos.');
      return false;
    }
    if (!correo.toLowerCase().endsWith('@gmail.com')) {
      alert('ERROR: Solo correos @gmail.com.');
      return false;
    }
    return true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    window.location.reload(); 
  }

  private enviarConfirmacionEmail(payload: any) {
    emailjs.send('service_alj4o3q', 'template_k8fotey', payload, 'GxV95fzjwof_j9O78')
    .then(() => console.log('Confirmación enviada'))
    .catch((err: any) => console.error('Error EmailJS:', err));
  }

  startCountdown() {
    const targetDate = new Date('April 12, 2026 00:00:00').getTime();
    this.timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) return clearInterval(this.timerInterval);
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    }, 1000);
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.formularioBloqueado) return;
    if (!this.validarFormulario()) return;
    if (!this.captchaToken) {
      alert('SEGURIDAD: Completa el reCAPTCHA.');
      return;
    }

    const payload = { ...this.registro };
    this.http.post(`${this.apiUrl}/registrar`, payload).subscribe({
      next: (res: any) => {
        this.enviarConfirmacionEmail(payload);
        this.nombreEquipoRegistrado = payload.nombre_equipo;
        this.mostrarModal = true;
        setTimeout(() => { if (this.mostrarModal) this.cerrarModal(); }, 5000);
        this.obtenerEscuadrones();
        this.registro = { nombre_equipo: '', correo: '', especialidad: '' };
        this.captchaToken = null;
      },
      error: (err) => alert('FALLO EN LA TRANSMISIÓN.')
    });
  }
}