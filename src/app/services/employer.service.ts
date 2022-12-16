import { Injectable } from '@angular/core';

// needed to make HTTP calls to the server api
import { HttpClient, HttpHeaders } from '@angular/common/http'

// needed to fetch the api domain
import { environment } from '../environments/environment';

// Http Headers
let headers = new HttpHeaders()
headers.append('Content_Type', 'application/json')

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  // read api url from environment file
  serverUrl: string = environment.serverUrl

  constructor(private http: HttpClient) { }

  // get all from api
  getEmployers() {
    return this.http.get(`${this.serverUrl}/api/employers`)
  }

  addEmployers(employer: any) {
    return this.http.post(`${this.serverUrl}/api/employers`, employer, {
      headers: headers
    })
  }

  deleteEmployer(_id: String) {
    return this.http.delete(`${this.serverUrl}/api/employers/${_id}`)
  }

  updateEmployer(employer: any) {
    return this.http.put(`${this.serverUrl}/api/employers/${employer._id}`, employer)
  }
}