import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHelia } from 'helia';
import { gossipsub } from '@chainsafe/libp2p-gossipsub';
import { kadDHT } from '@libp2p/kad-dht';
import { createLibp2p } from 'libp2p';
import { ipns, ipnsValidator, ipnsSelector } from '@helia/ipns';
import { dht, pubsub } from '@helia/ipns/routing';
import { unixfs } from '@helia/unixfs';
@Injectable()
export class HeliaService {
  // private readonly helia = createHelia();

  // constructor(private configService: ConfigService) {}
  // async get(fileKey: string) {
  //   const libp2p = await createLibp2p({
  //     dht: kadDHT({
  //       validators: {
  //         ipns: ipnsValidator,
  //       },
  //       selectors: {
  //         ipns: ipnsSelector,
  //       },
  //     }),
  //     pubsub: gossipsub(),
  //   });

  //   const helia = await createHelia({
  //     libp2p,
  //     //.. other options
  //   });
  //   const name = ipns(helia, [dht(helia), pubsub(helia)]);

  //   // create a public key to publish as an IPNS name
  //   const keyInfo = await helia.libp2p.keychain.createKey('my-key');
  //   const peerId = await helia.libp2p.keychain.exportPeerId(keyInfo.name);

  //   // store some data to publish
  //   const fs = unixfs(helia);
  //   const cid = await fs.add(Uint8Array.from([0, 1, 2, 3, 4]));

  //   // publish the name
  //   await name.publish(peerId, cid);

  //   // resolve the name
  //   const cid = name.resolve(peerId);
  // }

  // async onApplicationShutdown(): Promise<void> {
  //   if (this.helia != null) {
  //     await this.helia.stop();
  //   }
  // }
}
