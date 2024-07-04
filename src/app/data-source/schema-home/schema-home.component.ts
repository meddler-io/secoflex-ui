import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schema-home',
  templateUrl: './schema-home.component.html',
  styleUrls: ['./schema-home.component.scss']
})
export class SchemaHomeComponent implements OnInit {

  jsonEditorModel
  constructor() { }

  ngOnInit(): void {
  }

  jsonEditorSchema = {
    "metaData": "<< console.log('this should be of type code') >>",
    "productId": 0,
    "productName": "",
    "price": 0,
    "availability": "In Stock",
    "onSale": true,
    "dimensions": {
      "length": 0,
      "width": 0
    }
  }


  typeOverrides: any = {
    'string=code': (value: any) => {
      if (typeof value !== 'string') {
        return false;
      }
      const regex = new RegExp(/^<<(.*)>>$/, 's');
      return regex.test(value);
    }
  };

}
