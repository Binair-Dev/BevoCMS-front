import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WikiForm } from 'src/app/_models/forms/wikiForm';
import { Wiki } from 'src/app/_models/wiki';
import { WikiService } from 'src/app/_services/wiki.service';

@Component({
  selector: 'app-admin-wiki-edit',
  templateUrl: './admin-wiki-edit.component.html',
})
export class AdminWikiEditComponent {
  id: string = '';
  wiki: Wiki = new Wiki();
  formGroup: FormGroup = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private wikiService: WikiService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') as string;
    });

    this.formGroup = this.fb.group({
      title: ['', [Validators.minLength(3)]],
      description: ['', [Validators.minLength(3)]],
      image: ['', [Validators.minLength(3)]],
    });

    this.wikiService.getWiki(this.id).subscribe((data) => {
      this.wiki = data as Wiki;
      this.formGroup.setValue({
        title: this.wiki.title,
        description: this.wiki.description,
        image: this.wiki.image,
      });
    });
  }

  submit() {
    if (this.formGroup.valid) {
      let tosend = new WikiForm();
      tosend.title = this.formGroup.controls['title'].value;
      tosend.description = this.formGroup.controls['description'].value;
      tosend.image = this.formGroup.controls['image'].value;
      this.wikiService.updateWiki(this.id, tosend).subscribe((data) => {
        this.router.navigateByUrl('/admin/wikis');
      });
    }
  }
}
