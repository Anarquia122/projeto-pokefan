import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LlmService {

  constructor(private http: HttpClient) {}

  ask(question: string) {
    return this.http.post(
      'http://localhost:3000/chat',
      { question },
      { responseType: 'text' }
    );
  }
}