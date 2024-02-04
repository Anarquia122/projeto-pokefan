import { Component } from '@angular/core';
import { AfterViewInit, Renderer2, ElementRef } from '@angular/core';

interface desafios {
  titulo: string,
  texto: string
}

@Component({
  selector: 'app-recompensas',
  standalone: true,
  imports: [],
  templateUrl: './recompensas.component.html',
  styleUrl: './recompensas.component.css'
})
export class RecompensasComponent implements AfterViewInit {
  dadosDesafios: desafios[];

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.dadosDesafios = [
      {
        titulo: 'Rei dos mares',
        texto: 'Derrote 1 Mewtwo usando somente Magikarp'
      },
      {
        titulo: 'Elite enxame!',
        texto: 'Vença a Elite 4 somente com pokemons inseto'
      },
      {
        titulo: 'Captura amorosa',
        texto: 'Capture 5 lendários com Love Ball'
      },
      {
        titulo: 'Mestre a altura',
        texto: 'Vença o Pikachu do Ash com outro Pikachu'
      },
      {
        titulo: 'Desafio Olimpiano',
        texto: 'Vença "Zeus" do terinador Mulauvão com um Snorunt'
      },
      {
        titulo: 'Começando bem',
        texto: 'Roube os 3 iniciais do Professor Caralho'
      },
      {
        titulo: '7 anos de perdão',
        texto: 'Roube a Equipe Rocket'
      },
      {
        titulo: 'Hellsing',
        texto: 'Vença o "Drácula" do Mulauvão com Zangoose'
      },
      {
        titulo: 'Mestre Pokemon',
        texto: 'Derrote todos os lendários com um Metapod'
      }
    ]
  }

  ngAfterViewInit(): void {
    let i = 0;
    while (i < this.dadosDesafios.length) {
      this.mostrarDesafios(this.dadosDesafios[i]);

      i ++;
    }

  }

  mostrarDesafios(objetivos: desafios): void {
    const section = document.getElementById('desafios') as HTMLElement;
    if (section) {
      const container = document.createElement('div') as HTMLElement;
      container.style.margin = '10px';
      container.style.borderRadius = '16px';
      container.style.width = '350px';
      container.style.justifyContent = 'space-between';
      container.style.overflow = 'hidden';

      const caixa = document.createElement('div') as HTMLElement;
      caixa.style.borderLeft = '1px solid #ccc';
      caixa.style.display = 'flex';
      caixa.style.flexDirection = 'column';
      caixa.style.position = 'relative';
      caixa.style.textAlign = 'center';
      caixa.style.alignItems = 'center';
      caixa.style.width = '56.7%';
      caixa.style.height = '100%';
      caixa.style.padding = '10px'
      caixa.style.background = 'rgb(203,15,15)';
      caixa.style.background = 'linear-gradient(266deg, rgba(203,15,15,1) 42%, rgba(0,0,0,1) 79%)';

      const text = document.createElement('div') as HTMLElement;
      text.style.padding = '10px';
      text.style.flex = '1';
      text.style.float = 'right';
      text.style.color = '#ffffff';

      const img = document.createElement('img');
      img.src = '/assets/pagina-recompensas/pokebola.jpg';
      img.style.flex = '1';
      img.style.backgroundSize = 'cover';
      img.style.backgroundPosition = 'center';
      img.style.maxWidth = '43.3%';
      img.style.height = '100%';
      img.style.float = 'left';
      img.style.borderRadius = '16px 0 0 16px';

      container.addEventListener('mouseover', () => {
        img.style.transform = 'scale(1.3)';
        img.style.transition = 'transform 0.3s ease';
      });
      container.addEventListener('mouseout', () => {
        img.style.transform = 'scale(1)';
        img.style.transition = 'transform 0.3s ease';
      });

      const h6 = document.createElement('h6') as HTMLElement;
      h6.textContent = objetivos.titulo;
      h6.style.fontFamily = 'Oswald';

      const p = document.createElement('p') as HTMLElement;
      p.textContent = objetivos.texto;
      p.style.fontFamily = 'zilla slab';
      p.style.fontSize = '13px'

      const button = document.createElement('button') as HTMLElement;
      button.textContent = 'Ativar';
      button.style.padding = '3px';
      button.style.maxWidth = '80px'
      button.style.textAlign = 'center';
      button.style.backgroundColor = '#2b75a7';
      button.style.color = '#ffffff';
      button.style.cursor = 'pointer';
      button.style.border = 'none';
      button.style.borderRadius = '5px';
      button.style.width = '150px';

      button.addEventListener('mouseover', () => {
        button.style.backgroundColor = '#3498db';
      });
      button.addEventListener('mouseout', () => {
        button.style.backgroundColor = '#2b75a7';
      });

      button.addEventListener('click', () => {
        this.mostrarAlerta();
      });

      text.appendChild(h6);
      text.appendChild(p);

      caixa.appendChild(text);
      caixa.appendChild(button);

      container.appendChild(img);
      container.appendChild(caixa);

      section.appendChild(container);
    }
  }

  mostrarAlerta():void {
    alert('Esta função ainda não está disponível.');
  }
}