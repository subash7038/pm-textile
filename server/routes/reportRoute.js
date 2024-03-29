var express = require("express");
var router = express.Router();
const Log = require("../models/LogModel");
const Machines = require("../models/MachinesModel");


router.post("/production", (req, res) => {
Log
.aggregate(
[
    {
        $match:
        {
            date:{$in:req.body.dates},
            shift:{$in:req.body.shifts}
        }
    },
    {
        $group:
        {
            _id:{date:"$date",shift:"$shift"},
            machines:{$push:{ip:"$ip",data:"$data"}}
        }
        
    },
    {
        $project:
        {
            _id:0,
            date:"$_id.date",
            shift:"$_id.shift",
            machines:1
        }
    }
]
)
.then((result) => {
  res.send({
    result
  })
})
.catch(err => {
  res.status(400).send({err})
})
})


router.get("/details", (req, res) => {
  Machines.find({}).then(docArr => {
    let result = {}
    docArr.map(item => {
      result[item.ip] = {
        ...item._doc,
      }
    })

    res.send({
      result
    })
  }).catch(err => {
    res.status(400).send({
      err
    })
  })
})

module.exports = router;
