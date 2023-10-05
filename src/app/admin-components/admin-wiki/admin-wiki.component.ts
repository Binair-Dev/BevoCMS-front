import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WikiForm } from 'src/app/_models/forms/wikiForm';
import { Wiki } from 'src/app/_models/wiki';
import { WikiService } from 'src/app/_services/wiki.service';

@Component({
  selector: 'app-admin-wiki',
  templateUrl: './admin-wiki.component.html',
})
export class AdminWikiComponent {
  formGroup: FormGroup = new FormGroup({});
  wikis: Wiki[] = [];
  page: number = 0;

  constructor(
    private wikiService: WikiService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.minLength(3)]],
      description: ['', [Validators.minLength(3)]],
      image: ['', [Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.wikiService.getWikis().subscribe((data) => {
      this.wikis = data as Wiki[];
    });
  }

  editWiki(id: number | string) {
    this.router.navigateByUrl('admin/wikis/' + id);
  }

  createWiki() {
    if (this.formGroup.valid) {
      let tosend = new WikiForm();
      tosend.title = this.formGroup.controls['title'].value;
      tosend.description = this.formGroup.controls['description'].value;
      tosend.image = this.formGroup.controls['image'].value;

      this.wikiService.createWiki(tosend).subscribe((data) => {
        window.location.reload();
      });
    }
  }

  deleteWiki(id: number | string) {
    this.wikiService.deleteWiki(id).subscribe((data) => {
      window.location.reload();
    });
  }
}
