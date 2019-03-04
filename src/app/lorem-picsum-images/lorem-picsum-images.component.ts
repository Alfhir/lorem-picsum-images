import { Component, OnInit, Input } from '@angular/core';
import { ImageService } from '../lorem-picsum.service';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'lorem-picsum-images',
  templateUrl: './lorem-picsum-images.component.html',
  styleUrls: ['./lorem-picsum-images.component.scss']
})
export class LoremPicsumImagesComponent implements OnInit {
  @Input() numberOfImages: number;
  @Input() widthInPx: number;
  @Input() heightInPx: number;

  public trustedURLs: SafeUrl[] = [];

  constructor(private imgService: ImageService) {}

  ngOnInit() {
    this.imgService
      .getRandomImageBlobs(this.numberOfImages, this.widthInPx, this.heightInPx)
      .subscribe((blob: Blob) => {
        this.trustedURLs.push(this.imgService.getTrustedURL(blob));
      });
  }
}
