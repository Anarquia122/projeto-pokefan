import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { Renderer2, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'projeto-pilgrim-style';
  activeLink: string = '';
  hamburger: HTMLElement | null;
  nav: HTMLElement | null;
  navegacao: HTMLElement | null;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.activeLink = 'inicio';
    this.hamburger = null;
    this.nav = null;
    this.navegacao = null;
  }

  ngAfterViewInit(): void {
    this.hamburger = this.el.nativeElement.querySelector('.hamburger');
    this.nav = this.el.nativeElement.querySelector('.navbar');
    this.navegacao = this.el.nativeElement.querySelector('.navegacao')

    if (this.hamburger && this.nav) {
      this.renderer.listen(this.hamburger, 'click', () => {
        this.nav?.classList.toggle('active');
        this.navegacao?.classList.toggle('active');
      });
    }
  }

  ngOnInit(): void {
    this.activeLink = 'inicio';
  }

  setActive(link: string): void {
    this.activeLink = link;
    if (this.nav) {
      this.renderer.removeClass(this.nav, 'active');
      this.renderer.removeClass(this.navegacao, 'active');
    }
  }
}
