const IPFS = require('ipfs')
const Room = require('ipfs-pubsub-room')

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

    // now started to listen to room
    room.on('subscribed', () => {
        console.log('Now connected!')
    })

    room.on('message', (message) => {
        console.log('got message from ' + message.from + ': ' + message.data.toString())
    })

    setInterval(() => {
        room.broadcast("This is my " + counter++ + " Message.")
    }, 2000)
})
