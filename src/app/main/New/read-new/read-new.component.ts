import { Component, OnInit,ViewEncapsulation } from '@angular/core';
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

  loading: boolean = true;
  Id:any;
  news!: News;
  url ='https://shopgiay-be-tlcn.herokuapp.com/api/v1/admin/new/edit'
  constructor(private rest:RestApiService, private route: ActivatedRoute,private sanitizer:DomSanitizer) {
    this.Id = route.snapshot.params['id'];
   }
  htmlFormat: any
  ngOnInit() {
    this.rest.getOne(this.url,this.Id).then(data => {
      this.news =( data as {news: News}).news;
      this.htmlFormat = this.sanitizer.bypassSecurityTrustHtml(this.news.htmlData);
      this.loading =  false;
    })
  }

}
