import { Component, ViewChild, ElementRef } from '@angular/core';
import { LlmService } from '../../llmService';

interface Message {
  text: string;
  sender: 'user' | 'rotom';
}

@Component({
  selector: 'app-rotom-phone',
  standalone: true,
  imports: [],
  templateUrl: './rotom-phone.component.html',
  styleUrl: './rotom-phone.component.css'
})
export class RotomPhoneComponent {

  @ViewChild('rotomAiModal') rotomAiModal!: ElementRef<HTMLDialogElement>;

  modalAberta = false;

  messagesList: Message[] = [];
  newMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private llmService: LlmService,
  ) {
    this.messagesList.push({ text: 'Olá! Eu sou o Rotom, seu assistente de IA. Como posso ajudar você hoje?', sender: 'rotom' });
  }

  cleanMessages() {
    this.newMessage = '';
  }

  toggleModal() {
    this.cleanMessages();
    if (this.modalAberta) {
      this.fecharModal();
    } else {
      this.abrirModal();
    }
    this.modalAberta = !this.modalAberta;
  }

  abrirModal() {
    this.rotomAiModal.nativeElement.show();
  }

  fecharModal() {
    this.rotomAiModal.nativeElement.close();
  }

  @ViewChild('chatTextarea')
  chatTextarea!: ElementRef<HTMLTextAreaElement>;

  sendMessage() {
    if (this.newMessage.trim() === '') {
      console.log('Mensagem vazia, não enviada.');
      return;
    }

    this.isLoading = true;
    const question = this.newMessage;
    this.messagesList.push({ text: this.newMessage, sender: 'user' });
    // this.autoResize();
    console.log('Mensagem enviada:', this.newMessage);
    this.cleanMessages();

    this.llmService.ask(question).subscribe({
      next: (response: any) => {
        try {
          const parsedResponse = JSON.parse(response);

          const textToShow = parsedResponse.content || 'Sem resposta';

          this.messagesList.push({ text: textToShow, sender: 'rotom' });
        } catch (error) {
          console.error('Erro ao converter o JSON da resposta:', error);
          // Caso o JSON venha quebrado por algum motivo, exibe a resposta pura
          this.messagesList.push({ text: response, sender: 'rotom' });
        }
        this.isLoading = false;
        console.log('Lista de mensagens:', this.messagesList);
      },
      error: (error) => {
        console.error(error);
        this.messagesList.push({ text: 'Desculpe, ocorreu um erro ao processar sua pergunta. Por favor, tente novamente mais tarde.', sender: 'rotom' });
        this.isLoading = false;
        console.log('Lista de mensagens:', this.messagesList);
      }
    });

    // setTimeout(() => {
    //   this.messagesList.push({ text: 'Desculpe, ainda estou aprendendo a responder perguntas. Por favor, tente novamente mais tarde.', sender: 'rotom' });
    //   this.isLoading = false;
    //   console.log('Lista de mensagens:', this.messagesList);
    // }, 5000);
  }


}
