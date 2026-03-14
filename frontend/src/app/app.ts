import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent], 
  templateUrl: './app.html', 
  styleUrls: ['./app.css']    
})
export class AppComponent {
  title = 'frontend';

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const cursor = document.querySelector('.cursor-custom') as HTMLElement;
    if (cursor) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    }
  }
}