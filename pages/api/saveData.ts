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
    console.log(req.body)
    console.log(req.body)
    fs.writeFileSync('./public/static/data/equipments.json', JSON.stringify(req.body.equipments))
    fs.writeFileSync('./public/static/data/home.json', JSON.stringify(req.body.home))
    res.status(200)
    res.end()
}