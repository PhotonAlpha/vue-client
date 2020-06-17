import Trianglify from 'trianglify'

export default function getTrianglify(wid = 200, hei = 200, minimalSize = 60) {
  console.log('function getTrianglify', wid, hei, minimalSize)
  const url = Trianglify({
    width: wid,
    height: hei,
    cellSize: (Math.random() * 30) + minimalSize,
    xColors: 'random',
    yColors: 'random'
  }).toCanvas()
  console.log(url)
  return url
}
