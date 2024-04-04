// implementation of a mDNS / Bonjour Service Advertiser
// can not be used with Android, but works under Windows
import ciao from '@homebridge/ciao';

export default {
  startService() {
    const responder = ciao.getResponder();

    // create a service defining a web server running on port 3000
    const service = responder.createService({
      name: process.env.MDNSNAME,
      hostname: process.env.MDNSURL,
      type: 'https',
      port: process.env.PORT, // optional, can also be set via updatePort() before advertising
      txt: {
        // optional
        key: 'value',
      },
    });

    service.advertise().then(() => {
      // stuff you do when the service is published
      console.log('Service is published :)');
    });
  },
};
