import fs from 'fs'

export default (req, res) => {
    let data1 = fs.readFileSync('./data/equipments.json')
    let data2 = fs.readFileSync('./data/home.json')
    res.json({
        equipments: JSON.parse(data1.toString()),
        home: JSON.parse(data2.toString())
    })
}