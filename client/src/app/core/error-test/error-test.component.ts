import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-test',
  templateUrl: './error-test.component.html',
  styleUrls: ['./error-test.component.scss']
})
export class ErrorTestComponent implements OnInit {

  validationErrors: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error(): void {
    this.http.get('https://localhost:5001/api/products/42').subscribe(
      res => console.log(res),
      error => console.log(error)
    );
  }

  get500Error(): void {
    this.http.get('https://localhost:5001/api/Buggy/servererror').subscribe(
      res => console.log(res),
      error => console.log(error)
    );
  }

  get400Error(): void {
    this.http.get('https://localhost:5001/api/Buggy/badrequest').subscribe(
      res => console.log(res),
      error => console.log(error)
    );
  }

  get400ValidationError(): void {
    this.http.get('https://localhost:5001/api/Products/fortytwo').subscribe(
      res => console.log(res),
      error => {
        this.validationErrors = error.errors;
        console.log(this.validationErrors );
      }
    );
  }
}
