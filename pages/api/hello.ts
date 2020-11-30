// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiResponse, NextApiRequest } from "next"
import fs from 'fs'
import equipments from '../../src/equipments'

export default (req : NextApiRequest, res : NextApiResponse) => {
  res.statusCode = 200
  let files = fs.readdirSync('./public/static/images')
  fs.writeFileSync('./public/static/data/equipments.json', JSON.stringify(equipments))
  res.send(`
    <html>
      <body>
        ${files}
      </body>
    </html>
  `)
}
