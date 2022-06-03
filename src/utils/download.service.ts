import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
const http = require('http');
import { PhotosService } from 'src/photos/photos.service';

@Injectable()
export class DownloadService {
	constructor(
		private photoService: PhotosService,
	) { }

	async download(photoId: number) {
		const found = await this.photoService.findOne(photoId);
		if (!found) {
			throw new NotFoundException(`photo with not found`);
		}
		const {imageUrl} = found;
    console.log((imageUrl));
        const dest = path.join("..", "images");
      
        const res = function(url, dest, cb) {
            var file = fs.createWriteStream(dest);
            http.get(url, function(response) {
              response.pipe(file);
              file.on('finish', function() {
                file.close(cb);
              });
            });

          }(imageUrl, dest);


	}
}