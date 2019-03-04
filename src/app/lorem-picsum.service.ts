import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { repeat } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private httpClient: HttpClient, private readonly sanitizer: DomSanitizer) {}

  getRandomImageBlobs(
    numberOfImages: number,
    widthInPx: number,
    heightInPx: number
  ): Observable<Blob> {
    return this.httpClient
      .get(`https://picsum.photos/${widthInPx}/${heightInPx}/?random`, {
        headers: { 'Content-Type': 'image/jpg' },
        responseType: 'blob'
      })
      .pipe(repeat(numberOfImages));
  }

  getTrustedURL(blob: Blob): SafeUrl {
    const objectURL = window.URL.createObjectURL(blob);
    return this.sanitizer.bypassSecurityTrustUrl(objectURL);
  }
}
