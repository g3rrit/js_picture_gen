let https = require("https");
let jimp = require("jimp");

//const hl = 1024;
//const ch = 32;

let options = 
{
	host : 'www.googleapis.com',
	path : '/customsearch/v1',
	key : 'AIzaSyDv4wbWY-sDZla7lOI9fQiVZUU6DZCtLR0',
	cx : '010428416507706593183:lhqvqnzwsfg',
	searchtype : 'image'
}

let imageObject = 
{
    imageURL : [],
    imageData : [],

    pushURL : function(query, callback)
    {
        https.get(getURL(query), function (response)
        {
            let data = '';

            response.on('data', function(chunk)
            {		
                data += chunk;
            });

            response.on('end', function()
            {
                let dataObject = JSON.parse(data);

                //push url to urlarray
                for(count in dataObject.items)
                {
                    if(dataObject.items[count].pagemap.cse_image != undefined)
                    {
                        let url = dataObject.items[count].pagemap.cse_image[0].src;

                        imageObject.imageURL.push(url);
                        console.log("Image URL: " + url);
                    }
                }

                callback();

                /*for(let i = 0; i < imageObject.imageURL.length; i++)
                {
                console.log(imageObject.imageURL[i]);
                }*/
                //loadImage(imageObject.imageURL[0], null);
            });
        });
    },

    pushURLs : function(args, callback)
    {
        if(args.length > 0)
        {
            this.pushURL(args[args.length - 1], () => {this.pushURLs(args.slice(0,args.length-1), callback);});
        }
        else
        {
            callback();
        }
    },

    pushData : function (url, callback)
    {
        jimp.read(url, function(err, image)
        {
            if(err == null)
            {
                console.log("downloaded image with url:" + url);
                
                //image.resize(ch,ch);

                //scan image and get average rgb
                /*let avR = 0;
                let avG = 0;
                let avB = 0;
                image.scan(0,0,image.bitmap.width, image.bitmap.height, function(x,y,idx)
                {
                    avR += this.bitmap.data[idx];
                    avG += this.bitmap.data[idx + 1];
                    avB += this.bitmap.data[idx + 2];
                });
                let count = image.bitmap.width * image.bitmap.height;
                avR /= count;
                avG /= count;
                avB /= count;

                console.log(image.bitmap.data);
                imageObject.imageData.push({ data : image.bitmap.data, ave : { r : avR, g : avG, b : avB}});*/

                imageObject.imageData.push(image);
                //image.write("testimage.png", () => {});
            }else
            {
                console.log("ERROR DOWNLOADING IMAGE");
            }
            callback();
        });
    },

    fillData : function(callback)
    {
        this.imageData = new Array();

        let number = this.imageURL.length;
        
        for(let count = 0; count < this.imageURL.length; count++)
        {
            //console.log(count);
            this.pushData(this.imageURL[count], (() => 
            {
                number--;

                if(number <= 0)
                {
                    callback();
                }
            }).bind(this));
        }
    },

    saveData : function(startc, callback)
    {
        for(count in this.imageData)
        {
            let num = Number(startc) + Number(count);
            console.log(num);

            this.imageData[count].write("processpictures/" + num + ".jpg");

            console.log("image saved to /processpictures as " + num + ".jpg");
        }

        console.log("all images saved");

        callback();
    }
}

function getURL(query)
{
	return 'https://' + options.host + options.path + '?key=' + options.key + '&cx=' + options.cx + '&searchtype=' + options.searchtype + '&q=' + query		
}

	
/*imageObject.pushURL("orange", function()
{
    imageObject.fillData(function()
    {
        //console.log(imageObject.imageData[0].ave);
    });
});*/


//https.request('https://www.googleapis.com/customsearch/v1?key=AIzaSyDv4wbWY-sDZla7lOI9fQiVZUU6DZCtLR0&cx=010428416507706593183:lhqvqnzwsfg&q=orange',callback).end();
//https.get(options, callback);

exports.data = imageObject;







