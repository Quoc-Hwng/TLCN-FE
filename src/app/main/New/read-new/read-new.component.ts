import { Component, OnInit,ViewEncapsulation,ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from 'src/app/models/news';
import { RestApiService } from 'src/app/service/rest-api.service';

@Component({
  selector: 'app-read-new',
  templateUrl: './read-new.component.html',
  styleUrls: ['./read-new.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ReadNewComponent implements OnInit {
  elRef: ElementRef
  loading: boolean = true;
  Id:any;
  news!: News;
  url ='https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/new/edit'
  constructor(private rest:RestApiService, private route: ActivatedRoute,private sanitizer:DomSanitizer) {
    this.Id = route.snapshot.params['id'];
   }
  htmlFormat: string;
  htmlFormat1: string;
  htmlFormat2: string;
  ngOnInit() {
    this.rest.getOne(this.url,this.Id).then(data => {
      this.news =( data as {news: News}).news;
     // this.htmlFormat = this.sanitizer.bypassSecurityTrustHtml(this.news.htmlData);
      console.log(this.news.htmlData);
      this.htmlFormat = this.news.htmlData.split('&lt;').join('<');
      this.loading =  false;
    })
  }

}
