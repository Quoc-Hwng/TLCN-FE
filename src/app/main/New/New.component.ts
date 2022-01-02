import { Component, OnInit, TemplateRef } from '@angular/core';
import { News } from 'src/app/models/news';
import { DataService } from 'src/app/service/data.service';
import { RestApiService } from 'src/app/service/rest-api.service';

@Component({
  selector: 'app-New',
  templateUrl: './New.component.html',
  styleUrls: ['./New.component.css']
})
export class NewComponent implements OnInit {

  news!: News[];
  btnDisabled= false;
  loading: boolean = true;
  url='https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/new/list'
  deleteId!:string;
  confirmMessage='';
  constructor(private rest:RestApiService,
    private data: DataService) {
     }

  ngOnInit() {
    this.btnDisabled=true;
    this.rest.get(this.url).then(data=>{
        this.news =( data as {news: News[]}).news;
        console.log(data);
        this.loading = false;
        this.btnDisabled=false;
      })
      .catch(error=>{
        this.data.error(error['message']);
      })
    }
}

