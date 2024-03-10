import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { swapRequestForm } from 'src/shared/models/swapRequestForm.interface';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  getPendingRequests(): Observable<swapRequestForm[]> {
    return this.http.get<swapRequestForm[]>(`${environment.baseUrl}/getPendingRequests`);
  }
  getAllMessages(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.baseUrl}/getMessages`);
  }

  constructor(private http: HttpClient) {}

  sendBroadcastMessage(messageModel: { message: string }) :Observable<HttpResponse<string>>{
    const payload = JSON.stringify(messageModel);

    // Set the headers to indicate that the content type is JSON
    const headers = { 'Content-Type': 'application/json' };

    // Send a POST request with the JSON payload
    return this.http.post<string>(
      `${environment.baseUrl}/latestBroadCastMessage`,
      payload,
      {
        observe: 'response',
        headers: headers,
      }
    );
  }
}
