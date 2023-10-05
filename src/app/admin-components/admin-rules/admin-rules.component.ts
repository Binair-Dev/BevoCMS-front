import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RuleForm } from 'src/app/_models/forms/rule-form';
import { Rule } from 'src/app/_models/rule';
import { RuleService } from 'src/app/_services/rule.service';

@Component({
  selector: 'app-admin-rules',
  templateUrl: './admin-rules.component.html',
})
export class AdminRulesComponent {
  formGroup: FormGroup = new FormGroup({});
  rules: Rule[] = [];
  page: number = 0;

  constructor(
    private ruleService: RuleService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.minLength(3)]],
      description: ['', [Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.ruleService.getRules().subscribe((data) => {
      this.rules = data as Rule[];
    });
  }

  editRule(id: number | string) {
    this.router.navigateByUrl('admin/rules/' + id);
  }

  createRule() {
    if (this.formGroup.valid) {
      let tosend = new RuleForm();
      tosend.title = this.formGroup.controls['title'].value;
      tosend.description = this.formGroup.controls['description'].value;

      this.ruleService.createRule(tosend).subscribe((data) => {
        window.location.reload();
      });
    }
  }

  deleteRule(id: number | string) {
    this.ruleService.deleteRule(id).subscribe((data) => {
      window.location.reload();
    });
  }
}
