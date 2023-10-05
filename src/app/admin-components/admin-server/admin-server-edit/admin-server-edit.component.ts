import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerForm } from 'src/app/_models/forms/server-form';
import { Server } from 'src/app/_models/server';
import { ServerService } from 'src/app/_services/server.service';

@Component({
  selector: 'app-admin-server-edit',
  templateUrl: './admin-server-edit.component.html',
})
export class AdminServerEditComponent {
  id: string = '';
  server: Server = new Server();
  formGroup: FormGroup = new FormGroup({});

  constructor(
    private route: ActivatedRoute,
    private serverService: ServerService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') as string;
    });

    this.formGroup = this.fb.group({
      title: ['', [Validators.minLength(3)]],
      serverIp: ['', [Validators.minLength(3)]],
      serverPort: ['', [Validators.min(1)]],
      rconPort: ['', [Validators.min(1)]],
      rconPassword: ['', [Validators.minLength(3)]],
    });

    this.serverService.getServer(this.id).subscribe((data) => {
      this.server = data as Server;
      this.formGroup.setValue({
        title: this.server.title,
        serverIp: this.server.serverIp,
        serverPort: this.server.serverPort,
        rconPort: this.server.rconPort,
        rconPassword: this.server.rconPassword
      });
    });
  }

  submit() {
    if (this.formGroup.valid) {
      let tosend = new ServerForm();
      tosend.title = this.formGroup.controls['title'].value;
      tosend.serverIp = this.formGroup.controls['serverIp'].value;
      tosend.serverPort = this.formGroup.controls['serverPort'].value;
      tosend.rconPort = this.formGroup.controls['rconPort'].value;
      tosend.rconPassword = this.formGroup.controls['rconPassword'].value;
      this.serverService.updateServer(this.id, tosend).subscribe((data) => {
        this.router.navigateByUrl('/admin/servers');
      });
    }
  }
}
