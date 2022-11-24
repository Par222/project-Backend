const cheerio=require("cheerio")
const request=require("request")

const fetchAboutInfo = async (req, res, next) => {
  const url=req.query.url
  let $
  let about;
  request(url,function(error,response,html){
    if(!error)
    {
    $=cheerio.load(html)
    about=$('p').text()
    }
    
    res.json({"about":about})
  })
};
const fetchDepInfo = async (req, res, next) => {
    const url=req.query.url
    let $
    let dep;
    request(url,function(error,response,html){
      if(!error)
      {
      $=cheerio.load(html)  
      }
      dep=$('p').text()
      res.send($.html())
    })
  };
  
  



module.exports.fetchAboutInfo=fetchAboutInfo
module.exports.fetchDepInfo=fetchDepInfo


