import { Component, OnInit } from '@angular/core';
import { EmployerService } from 'src/app/services/employer.service';

@Component({
  selector: 'app-employer',
  templateUrl: './employer.component.html'
})
export class EmployerComponent implements OnInit {

  constructor(private service: EmployerService) {}

  // object to hold the json list of employers
  employers: any
  // properties for each individual employer
  _id:String | undefined
  name: String | undefined
  region: String | undefined
  description: String | undefined

  // get all employers from service, which gets them from the server api
  getEmployers(): void {
    this.service.getEmployers().subscribe(response => {
      this.employers = response
    })
  }

  addEmployers(): void {
    // create & populate new employer object
    let employer = {
      _id: this._id,
      name: this.name,
      region: this.region,
      description: this.description
    }
    this.service.addEmployers(employer).subscribe(response => {
      // update the list
      this.getEmployers()
      // clear the form
      this.clearForm()
    })
  }

  deleteEmployer(_id: String): void {
    if (confirm('Are you sure you want to delete this?')) {
      this.service.deleteEmployer(_id).subscribe(response => {
        this.getEmployers() // refresh list
        this.clearForm() // wipe out form input values
        alert('Deletion Successful')
      })
    }
  }

  updateEmployer(): void {
    let employer = {
      _id: this._id,
      name: this.name,
      location: this.region,
      description: this.description
    }

    this.service.updateEmployer(employer).subscribe(response => {
      this.getEmployers() // refresh list
      this.clearForm() // wipe out form input values
      //alert('Update Successful')
    })
  }

  selectEmployer(_id: String, name: String, region:String, description: String): void {
    this._id = _id
    this.name = name
    this.region = region
    this.description = description
  }

  clearForm(): void {
    this._id = undefined
    this.name = undefined
    this.region = undefined
    this.description = undefined
  }


  ngOnInit(): void {
    this.getEmployers()
  }
}