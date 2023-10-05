import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Images } from 'src/app/_models/images';
import { ImageService } from 'src/app/_services/image.service';

@Component({
  selector: 'app-admin-images',
  templateUrl: './admin-images.component.html',
})
export class AdminImagesComponent {
  images: Images = new Images();
  imageFormGroup: FormGroup = new FormGroup({});
  selectedFile: File | null = null;

  constructor(private imageService: ImageService) {
    this.imageService.getImages().subscribe((data) => {
      this.images = data as Images;
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload() {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.imageService
      .uploadImage(formData)
      .subscribe((data) => window.location.reload());
  }

  deleteImage(name: string) {
    let splitted = name.split('/');
    let clearName = splitted[splitted.length - 1];
    this.imageService.deleteImage(clearName).subscribe((data) => {
      window.location.reload();
    });
  }

  open(link: string) {
    window.open(link,'_blank');
  }
}
