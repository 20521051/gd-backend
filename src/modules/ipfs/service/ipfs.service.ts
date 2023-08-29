import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Web3Storage, getFilesFromPath } from 'web3.storage';

@Injectable()
export class IPFSService {
  private readonly ipfsAccessToken = this.configService.get('TOKEN');
  private readonly ipfsStorageClient = new Web3Storage({ token: this.ipfsAccessToken });

  constructor(private readonly configService: ConfigService) {}

  async getFiles(path) {
    const files = await getFilesFromPath(path);
    console.log(`read ${files.length} file(s) from ${path}`);
    return files;
  }

  makeFileObjects() {
    // You can create File objects from a Buffer of binary data
    // see: https://nodejs.org/api/buffer.html
    // Here we're just storing a JSON object, but you can store images,
    // audio, or whatever you want!
    const obj = { hello: 'world' };
    const buffer = Buffer.from(JSON.stringify(obj));

    const files = [new File(['contents-of-file-1'], 'plain-utf8.txt'), new File([buffer], 'hello.json')];
    return files;
  }
}
