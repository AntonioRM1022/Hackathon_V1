import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface CarouselItem {
  type: 'video' | 'image';
  src: string;
  tag: string;
  title: string;
  muted?: boolean;
  volume?: number;
}

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  // Guardamos la base original
  private listaBase: CarouselItem[] = [
    { type: 'video', src: '/carrusel/HackatonMovie1.mp4', tag: 'BUILD', title: 'Next-Gen', muted: true, volume: 0.5 },
    { type: 'image', src: '/carrusel/Dev_Comunity.png', tag: 'TEAMWORK', title: 'Dev Community' },
    { type: 'image', src: '/carrusel/Tech_Future.png', tag: 'INNOVATION', title: 'Tech Future' },
    { type: 'video', src: '/carrusel/HackatonMovie2.mp4', tag: 'FLASHBACK', title: 'Aftermovie 2025', muted: true, volume: 0.5 }
  ];

  listaVideosInfinitos: CarouselItem[] = [...this.listaBase, ...this.listaBase];

  toggleSound(item: CarouselItem): void {
    if (item.type !== 'video') return;

    const nuevoEstadoMuted = !item.muted;
    const todosLosVideos = document.querySelectorAll('video');

    todosLosVideos.forEach((v: HTMLVideoElement) => {
      v.muted = true;
    });

    this.listaVideosInfinitos.forEach(vid => {
      if (vid.type === 'video') {

        vid.muted = (vid.src === item.src) ? nuevoEstadoMuted : true;
      }
    });


    todosLosVideos.forEach((v: HTMLVideoElement) => {
      if (v.src.includes(item.src)) {
        v.muted = nuevoEstadoMuted;
      }
    });
  }

  setVolume(item: CarouselItem, event: any): void {
    const nuevoVolumen = parseFloat(event.target.value);


    this.listaVideosInfinitos.forEach(vid => {
      if (vid.type === 'video' && vid.src === item.src) {
        vid.volume = nuevoVolumen;
        vid.muted = nuevoVolumen === 0;
      }
    });


    const todosLosVideos = document.querySelectorAll('video');
    todosLosVideos.forEach((v: HTMLVideoElement) => {
      if (v.src.includes(item.src)) {
        v.volume = nuevoVolumen;
        v.muted = nuevoVolumen === 0;
      }
    });
  }

  irAKFC(): void {
    const url = 'https://www.google.com/maps/search/KFC+Plaza+Chimalhuacán';
    window.open(url, '_blank');
  }
}