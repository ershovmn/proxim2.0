import { NextApiResponse, NextApiRequest } from "next"
import fs from 'fs'

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '10mb',
      },
    },
  }

export default (req : NextApiRequest, res : NextApiResponse) => {
    fs.writeFileSync('./data/equipments.json', JSON.stringify(req.body.equipments))
    fs.writeFileSync('./data/home.json', JSON.stringify(req.body.home))
    res.status(200)
    res.end()
}