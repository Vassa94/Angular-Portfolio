import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import {  ModalDismissReasons,NgbModal,NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css'],
})
export class SobreMiComponent implements OnInit {
  miInfo: any;
  closeResult: any;
  constructor(
    //public activeModal: NgbActiveModal,
    private datosPortfolio: PortfolioService,
    private modalService: NgbModal,
    private appComponent: AppComponent
  ) {}

  ngOnInit(): void {
    this.datosPortfolio.getHeader().subscribe((data) => {
      this.miInfo = data;
    });
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public loG() {
    return this.appComponent.loggedIn;
  }

  save(){
    //this.activeModal.close();
  }
}
