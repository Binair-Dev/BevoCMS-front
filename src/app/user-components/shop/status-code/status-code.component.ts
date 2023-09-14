import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseMessage } from 'src/app/_models/response-message';
import { ShopService } from 'src/app/_services/shop.service';

@Component({
  selector: 'app-status-code',
  templateUrl: './status-code.component.html'
})
export class StatusCodeComponent {
  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private router: Router
  ) {}

  message: string = ""

  ngOnInit() {
    if(this.route.snapshot.queryParamMap.get('code') != null) {
      let code = this.route.snapshot.queryParamMap.get('code');
      this.shopService.addCredit(code as string).subscribe(
        (data) => {
          this.message = (data as ResponseMessage).message;
          setTimeout(() => {
            this.router.navigateByUrl('/credit');
          }, 1500);
        },
        (error) => {
          this.message = "Le code spécifié n'est pas valide !";
          setTimeout(() => {
            this.router.navigateByUrl('/credit');
          }, 1500)
        }
      );
    }
  }
}
