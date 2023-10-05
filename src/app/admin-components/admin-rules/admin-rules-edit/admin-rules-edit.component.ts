import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RuleForm } from 'src/app/_models/forms/rule-form';
import { Rule } from 'src/app/_models/rule';
import { RuleService } from 'src/app/_services/rule.service';

@Component({
  selector: 'app-admin-rules-edit',
  templateUrl: './admin-rules-edit.component.html',
})
export class AdminRulesEditComponent {
  id: string = '';
  rule: Rule = new Rule();
  formGroup: FormGroup = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private ruleService: RuleService,
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
    });

    this.ruleService.getRule(this.id).subscribe((data) => {
      this.rule = data as Rule;
      this.formGroup.setValue({
        title: this.rule.title,
        description: this.rule.description,
      });
    });
  }

  submit() {
    if (this.formGroup.valid) {
      let tosend = new RuleForm();
      tosend.title = this.formGroup.controls['title'].value;
      tosend.description = this.formGroup.controls['description'].value;
      this.ruleService.updateRule(this.id, tosend).subscribe((data) => {
        this.router.navigateByUrl('/admin/rules');
      });
    }
  }
}
