import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projeto-pilgrim-style';
  activeLink: string = '';

  ngOnInit(): void {
    // Inicializa activeLink com "inicio" ao iniciar o componente
    this.activeLink = 'inicio';
  }

  setActive(link: string): void {
    this.activeLink = link;
  }
}
