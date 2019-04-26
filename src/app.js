const IPFS = require('ipfs')
const Room = require('ipfs-pubsub-room')
const crypto = require('crypto')


const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAj3esh+8vIdSIb44d0yGB
WDwOgQDAUqbZbSUkS7ho9OP3ptopmqw20Bc37RfKAqEjqY88kzl011BWw/MB/u0w
5f5ps8VH/lqFE/WeUWbuYZGi7w5dcGrUmiDYOPyz4B7GlYFUwkkiaduIFIRwO36/
+Vw9oC4cXpyxjJfFgVWLyhvCwuTOSy8E+LgZVNreIGeK0x1Cg3H3n2tR9I/ZmdWp
oVqQS3w7AxcSwz8g+KekLEVwFjuoWEu2z0KHrgLoyI4ksDJI6pCI+PjhQydcLhST
vSJCSBe+qleaecxrLR3P8Xs5HLYu3Mc4Sssdu+/3bBbUKufnxaTX6Rkp+SfxwGyK
rwIDAQAB
-----END PUBLIC KEY-----`;


const ipfs = new IPFS({
    EXPERIMENTAL: {
      pubsub: true
    },
    config: {
      Addresses: {
        Swarm: [
          '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star'
        ]
      }
    }
  })
var counter = 1;

ipfs.on('ready', () => {
    const room = Room(ipfs, 'room-name')

    room.on('peer joined', (peer) => {
        console.log('Peer joined the room', peer)
    })

    room.on('peer left', (peer) => {
        console.log('Peer left...', peer)
    })


    setInterval(() => {
      var textMessage = "This is my " + counter++ + " Message."
      var encMessage = crypto.publicEncrypt(publicKey, Buffer.from(textMessage, 'binary')).toString('base64')
      room.broadcast(encMessage)
    }, 2000)
})
