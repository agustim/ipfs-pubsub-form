const IPFS = require('ipfs')
const Room = require('ipfs-pubsub-room')
const crypto = require('crypto')

const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCPd6yH7y8h1Ihv
jh3TIYFYPA6BAMBSptltJSRLuGj04/em2imarDbQFzftF8oCoSOpjzyTOXTXUFbD
8wH+7TDl/mmzxUf+WoUT9Z5RZu5hkaLvDl1watSaINg4/LPgHsaVgVTCSSJp24gU
hHA7fr/5XD2gLhxenLGMl8WBVYvKG8LC5M5LLwT4uBlU2t4gZ4rTHUKDcfefa1H0
j9mZ1amhWpBLfDsDFxLDPyD4p6QsRXAWO6hYS7bPQoeuAujIjiSwMkjqkIj4+OFD
J1wuFJO9IkJIF76qV5p5zGstHc/xezkcti7cxzhKyx277/dsFtQq5+fFpNfpGSn5
J/HAbIqvAgMBAAECggEASEcZY65rh1akmdb2TZzOph4zjGhNfBZU6bjRjVhNgDqt
VKEKXsMuJi3cXhUjD6oQ5makNOO4apUt8TAnLEBg5y4CILBeMdV2v/R5GzeJFxyh
AmCxUGZxz2iGpkchc+LtVvq+MddYgA46g2Opiz+zBbSj02QHpN66UENSHHN1po8K
y9yNcXBxta3fwRS0g/ARLxbGnkKBhOxraV6UwOcjRFDAO6aC25KyP59JAM0SxmnO
G1sIDwiYz8lfM1D5ydffWAKGCU7ZBkrVDM4yumSpqEwCMTTcnEjTbQ8ZDYSz1vZZ
haVGzcgUrPtB9SGOgt9GbVrr0CMrSkEH9QVoPuVlGQKBgQDqYk+N92CZZ22pQ8te
kz1wyyqcJWrltMHKMLxzbDFzcJoL219XmGAcPG7fk4Qc6zq8E0f/+dfrbNyCUBEf
Zxal0t70QJWhCTxdQnLCTqLn1sdMr5POkVjEnF04kwacqolmNVC50H6sW2ilzzQn
CzjwoTzfGWoyLWU5YZXCfXXEXQKBgQCcst57Qyz/Sa6SaFjHzVQeDc9TqtVo9niu
H6DUTnCgM57mvBeYsedet359NJ3ET0vQT5RRAkPRBqgezxNb3OAa/dhV1glvArHr
7UPsAH6Yp98taYFHomqivR8CXq9AxV2EcAwIHBYJR21U6g/7XGUEExz2tQ+AzrBd
IFVo9CDaewKBgAMLIcNTKgLz792ZzsM8oDidusDqT3gKH9YTSe8pwX6hQK7Uu2k0
xlK3ii0HClkhyNJ2YaH2SZJ6CGb8ySwiN44Rrel4CTldGFaRrVHOmZjvFglt4jp1
crSi3ycD6bsRD9Wu7YxsI6jzSumURjYXlDazsUmoV9Os+TqEhOBQpr3VAoGAHBRx
ieUfyx+JCPNp9WP2DuyqmnOiioygU5OXXnQv+oVFlFNgZxx6OZ7oK8eh/eu3yjx4
d4vQW0S2G88/yNZr0mpqufcA+cOh3oVGBqSQCwsKEzk00YFpWoBJbkNJZHH5sCHk
BhACYudJ0E2hT4nfEDvclNkdThe7wvRoWcZlnMECgYBDSLnDeyduLhvctgcJUU9F
QdqFYAWjzXFfJItUGWAGFC7Lpn8PVcc7u6hH1oFJlohi39T2gYrKB5PmYN9/52/r
u8ThbAvTm+yqMmsDNkBkohfx25p3NLsV0r46mpRXuraQTFXcYrc1mW+BkoteY06S
Oe6lSHTplzRc0QPTat5+mQ==
-----END PRIVATE KEY-----`;



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

ipfs.on('ready', () => {
    const room = Room(ipfs, 'room-name')

    room.on('peer joined', (peer) => {
        console.log('Peer joined the room', peer)
    })

    room.on('peer left', (peer) => {
        console.log('Peer left...', peer)
    })

    room.on('subscribed', () => {
        console.log('Now connected!')
    })

    room.on('message', (message) => {
      var textEncryptMessage = Buffer.from(message.data.toString(),'base64')
      var decMessage = crypto.privateDecrypt(privateKey, textEncryptMessage)
      console.log('got message from ' + message.from + ': ' + decMessage.toString())
    })

})
