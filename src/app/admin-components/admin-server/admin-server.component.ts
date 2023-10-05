import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerForm } from 'src/app/_models/forms/server-form';
import { Server } from 'src/app/_models/server';
import { ServerService } from 'src/app/_services/server.service';

@Component({
  selector: 'app-admin-server',
  templateUrl: './admin-server.component.html',
})
export class AdminServerComponent {
  formGroup: FormGroup = new FormGroup({});
  servers: Server[] = [];
  page: number = 0;

  constructor(
    private serverService: ServerService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.minLength(3)]],
      serverIp: ['', [Validators.minLength(3)]],
      serverPort: ['', [Validators.min(1)]],
      rconPort: ['', [Validators.min(1)]],
      rconPassword: ['', [Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.serverService.getServers().subscribe((data) => {
      this.servers = data as Server[];
    });
  }

  editServer(id: number | string) {
    this.router.navigateByUrl('admin/servers/' + id);
  }

  createServer() {
    if (this.formGroup.valid) {
      let tosend = new ServerForm();
      tosend.title = this.formGroup.controls['title'].value;
      tosend.serverIp = this.formGroup.controls['serverIp'].value;
      tosend.serverPort = this.formGroup.controls['serverPort'].value;
      tosend.rconPort = this.formGroup.controls['rconPort'].value;
      tosend.rconPassword = this.formGroup.controls['rconPassword'].value;

      this.serverService.createServer(tosend).subscribe((data) => {
        window.location.reload();
      });
    }
  }

  deleteServer(id: number | string) {
    this.serverService.deleteServer(id).subscribe((data) => {
      window.location.reload();
    });
  }
}
