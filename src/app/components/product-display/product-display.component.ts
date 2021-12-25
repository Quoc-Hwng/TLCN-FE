import { Component, OnInit, Input ,TemplateRef} from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css','./product-display.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class ProductDisplayComponent implements OnInit {
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  open(content: TemplateRef<any>) {
    this.modalService.open(content, {ariaDescribedBy: 'modal-basic-title', size: "1000px" });
  }

  ngOnInit(): void {
  }
  @Input() product: any;
  displayModal: boolean;
  showModalDialog() {
    this.displayModal = true;
}
finishAndAlert( message: any){
  this.ngOnInit();
}

}


