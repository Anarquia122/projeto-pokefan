import { Component } from '@angular/core';
import { ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Inject } from '@angular/core';

interface Pokemon {
  nome: string,
  elementos: string[],
  vantagens: string[],
  desvantagens: string[],
  descricao: string
}

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css'
})
export class PokedexComponent implements AfterViewInit {
  botoes: NodeListOf<HTMLButtonElement>;
  pokemons: NodeListOf<HTMLDivElement>;
  dadosPersonagens: Pokemon[];

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.botoes = {} as NodeListOf<HTMLButtonElement>;
    this.pokemons = {} as NodeListOf<HTMLDivElement>;
    this.dadosPersonagens = [
      {
        nome: 'Golurk',
        elementos: ['terrestre', 'fantasma'],
        vantagens: ['normal', 'lutador', 'veneno', 'pedra', 'inseto', 'eletrico'],
        desvantagens: ['fantasma', 'agua', 'grama', 'gelo', 'sombrio'],
        descricao: 'Golurk é uma criação robusta inspirada em um golem. Sua estrutura maciça e imponente exibem uma força impressionante. Equipado com propulsores nas mãos para voar, Golurk possui habilidades relacionadas à manipulação de energia e controle sobre a terra, tornando-o uma presença formidável em batalhas.'
      },
      {
        nome: 'Lucario',
        elementos: ['lutador', 'metal'],
        vantagens: ['normal', 'veneno', 'pedra', 'inseto', 'metal', 'grama', 'gelo', 'dragao', 'sombrio'],
        desvantagens: ['lutador', 'terrestre', 'fogo'],
        descricao: 'Lucario é um Pokémon ágil e sábio, com uma aparência elegante e características caninas. Conhecido por sua habilidade de sentir e manipular energia, Lucario é um mestre das técnicas de luta baseadas na aura. Suas habilidades de Metal proporcionam resistência e força adicionais, tornando-o um parceiro leal em batalhas intensas.'
      },
      {
        nome: 'Gliscor',
        elementos: ['terrestre', 'voador'],
        vantagens: ['lutador', 'veneno', 'terrestre', 'inseto', 'eletrico'],
        desvantagens: ['agua', 'gelo'],
        descricao: 'Gliscor é uma criatura fascinante, combinando características terrestres e voadoras. Suas asas membranosas permitem voar, enquanto suas garras afiadas e cauda com ferrões o tornam formidável em combate. Gliscor é conhecido por sua agilidade e habilidades de voo, tornando-o um adversário temível em batalhas aéreas e terrestres.'
      },
      {
        nome: 'Noivern',
        elementos: ['voador', 'dragao'],
        vantagens: ['lutador', 'terrestre', 'inseto', 'fogo', 'agua', 'grama'],
        desvantagens: ['pedra', 'gelo', 'dragao', 'fada'],
        descricao: 'Noivern é um Pokémon majestoso, combinando elementos de morcego e dragão. Com grandes asas e orelhas alongadas, Noivern é ágil e poderoso. Como um Pokémon do elementos Voador/Dragão, Noivern é capaz de manobras graciosas no ar e de emitir ondas sonoras devastadoras, tornando-se uma escolha versátil para treinadores.'
      },
      {
        nome: 'Charizard',
        elementos: ['fogo', 'voador'],
        vantagens: ['lutador', 'terrestre', 'inseto', 'metal', 'fogo', 'grama', 'fada'],
        desvantagens: ['agua', 'pedra', 'eletrico'],
        descricao: ' Charizard é um Pokémon icônico do elementos Fogo/Voador, conhecido por sua aparência imponente e asas poderosas. Com uma presença majestosa, Charizard é capaz de voar a grandes altitudes e usar seu sopro de fogo ardente em batalhas. Além de ser um símbolo de coragem, Charizard é um companheiro leal para treinadores que buscam desafios emocionantes.'
      }
    ];
  }

  ngAfterViewInit(): void {
    // Verifica se está no ambiente do navegador antes de acessar o DOM
    if (isPlatformBrowser(this.platformId)) {
      this.botoes = document.querySelectorAll('.botao');
      this.pokemons = document.querySelectorAll('.pokemon');

      this.atualizarDescricao(this.dadosPersonagens[0]);

      this.botoes.forEach((botao, indice) => {
        botao.addEventListener('click', () => {
          this.atualizarDescricao(this.dadosPersonagens[indice]);

          this.desselecionarBotao();
          botao.classList.add('selecionado');

          this.desselecionarPersonagem();
          this.pokemons[indice].classList.add('selecionado');
        });
      });
    }
  }

  atualizarDescricao(personagem: Pokemon): void {
    if (isPlatformBrowser(this.platformId)) {
      const descricao = document.getElementById('descricao');
      if (descricao) {
        descricao.innerHTML = '';  // Limpa o conteúdo existente

        // Cria elementos para os dados
        //nome do pokemon
        const h1 = document.createElement('h1');
        h1.textContent = personagem.nome;
        h1.style.webkitTextStroke = '1px black';
        h1.style.marginLeft = '40px';
        h1.style.fontFamily = 'tektur';

        //tipagem do pokemon

        const tipo = document.createElement('p')
        tipo.textContent = `Tipo: `
        tipo.style.fontWeight = '600';
        tipo.style.marginLeft = '45px';
        tipo.style.fontFamily = 'tektur';
        tipo.style.webkitTextStroke = '1px black';
        tipo.style.fontSize = '23px'

        const elementos = document.createElement('div');
        elementos.style.marginLeft = '45px';
        elementos.style.borderBottom = '1px solid rgb(28, 21, 39)';
        personagem.elementos.forEach(elementosItem => {
          const img = document.createElement('img');
          img.src = `/assets/tipos-pokemons/${elementosItem}.png`;
          img.alt = elementosItem;
          img.classList.add('elementos');
          img.style.maxWidth = '120px';
          img.style.marginBottom = '10px';
          elementos.appendChild(img);
        });

        //vantagem do pokemon

        const resistente = document.createElement('p');
        resistente.innerHTML = `Resistente contra: `;
        resistente.style.fontWeight = '600';
        resistente.style.marginLeft = '45px';
        resistente.style.fontFamily = 'tektur';
        resistente.style.webkitTextStroke = '1px black';
        resistente.style.fontSize = '23px'

        const vantagens = document.createElement('div');
        vantagens.style.marginLeft = '45px';
        vantagens.style.borderBottom = '1px solid rgb(28, 21, 39)'
        personagem.vantagens.forEach(vantagemItem => {
          const img = document.createElement('img');
          img.src = `/assets/tipos-pokemons/${vantagemItem}.png`;
          img.alt = vantagemItem;
          img.classList.add('vantagens');
          img.style.maxWidth = '60px';
          img.style.marginBottom = '10px';
          vantagens.appendChild(img);
        });

        //desvantagem do pokemon

        const fraco = document.createElement('p');
        fraco.innerHTML = `Fraco contra: `;
        fraco.style.fontWeight = '600';
        fraco.style.marginLeft = '45px';
        fraco.style.fontFamily = 'tektur';
        fraco.style.webkitTextStroke = '1px black';
        fraco.style.fontSize = '23px'

        const desvantagens = document.createElement('div');
        desvantagens.style.marginLeft = '45px';
        personagem.desvantagens.forEach(desvantagemItem => {
          const img = document.createElement('img');
          img.src = `/assets/tipos-pokemons/${desvantagemItem}.png`;
          img.alt = desvantagemItem;
          img.classList.add('desvantagens');
          img.style.maxWidth = '60px';
          img.style.marginBottom = '10px';
          desvantagens.appendChild(img);
        });

        //descrição do pokemon

        const descricaoText = document.createElement('p');
        descricaoText.textContent = personagem.descricao;
        descricaoText.classList.add('descrevendo');
        descricaoText.style.wordBreak = 'break';
        descricaoText.style.maxWidth = '60%'
        descricaoText.style.border = '2px solid rgb(28, 21, 39)';
        descricaoText.style.backgroundColor = '#ffffff';
        descricaoText.style.color = '#000000';
        descricaoText.style.borderRadius = '16px';
        descricaoText.style.padding = '10px';
        descricaoText.style.marginLeft = '45px';

        // Adiciona os elementos à descrição
        descricao.appendChild(h1);
        descricao.appendChild(tipo);
        descricao.appendChild(elementos);
        descricao.appendChild(resistente);
        descricao.appendChild(vantagens);
        descricao.appendChild(fraco);
        descricao.appendChild(desvantagens);
        descricao.appendChild(descricaoText);
      }
    }
  }

  desselecionarPersonagem(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.pokemons.forEach((pokemon) => {
        pokemon.classList.remove('selecionado');
      });
    }
  }

  desselecionarBotao(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.botoes.forEach((botao) => {
        botao.classList.remove('selecionado');
      });
    }
  }
}