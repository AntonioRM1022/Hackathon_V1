import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit, OnDestroy {
  targetDate = new Date('2026-04-12T00:00:00').getTime();
  
  days: string = '00';
  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';
  
  private intervalId: any;

  ngOnInit(): void {
    this.updateTimer();
    this.intervalId = setInterval(() => this.updateTimer(), 1000);
  }

  updateTimer(): void {
    const now = new Date().getTime();
    const distance = this.targetDate - now;

    if (distance < 0) {
      this.days = '00'; this.hours = '00'; this.minutes = '00'; this.seconds = '00';
      if (this.intervalId) clearInterval(this.intervalId);
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    this.days = d < 10 ? '0' + d : d.toString();
    this.hours = h < 10 ? '0' + h : h.toString();
    this.minutes = m < 10 ? '0' + m : m.toString();
    this.seconds = s < 10 ? '0' + s : s.toString();
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}