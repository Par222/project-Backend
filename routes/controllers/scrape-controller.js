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
      res.send($.html)
    })
  };
  
const fetchServiceInfo = async (req,res,next) => {
  const url = req.query.url
  let $
  request(url, function(error,response,html){
    if(!error){
      $ = cheerio.load(html)
    }

    //Title Extraction
    let titlesArray = $('.elementor-element-populated .elementor-widget-heading .elementor-widget-container h4')
    let headerTitle = [];
    for(let i=0; i<titlesArray.length; i++){
      let header = $(titlesArray[i]);
      headerTitle.push($(header).text());
    }

    //image extraction
    let imageArray = $('img')
    let imageList = []
    for(let i=0; i<imageArray.length; i++){
      let img = imageArray[i].attribs.src;
      imageList.push(img);
    }

    //paragraph extraction
    let paraArray = $('.elementor-widget-container p')
    let paraTitle = [];
    for (let i = 0; i < paraArray.length; i++) {
      let paras = $(paraArray[i]);
      paraTitle.push($(paras).text());
    }

    // console.log(paraArray);

    res.json({"headTitle":headerTitle, "images":imageList, "paraTitle":paraTitle})
  })
};



module.exports.fetchAboutInfo=fetchAboutInfo
module.exports.fetchDepInfo=fetchDepInfo
module.exports.fetchServiceInfo=fetchServiceInfo


