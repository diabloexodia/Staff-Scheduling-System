import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { messageModel } from 'src/shared/models/messageModel.interface';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {


  getPendingRequests() : Observable<any>{
    return  this.http.get("https://localhost:7023/getPendingRequests");
  }
  getAllMessages() : Observable<any>{
  return  this.http.get("https://localhost:7023/getMessages");
  }

  constructor(private http:HttpClient) { }


  sendBroadcastMessage(messageModel: {message : string}){

    const payload = JSON.stringify(messageModel);

    // Set the headers to indicate that the content type is JSON
    const headers = { 'Content-Type': 'application/json' };

    // Send a POST request with the JSON payload
    return this.http.post("https://localhost:7023/latestBroadCastMessage", payload,  {
      observe: 'response',
      headers: headers
    }
    );
  
   
  }
}
