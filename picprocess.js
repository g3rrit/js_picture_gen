let jimp = require("jimp");
let bar = require("./progressbar/bar");

const ch = 128;
const hl = 1024;

let picture = 
{
    picarray : new Array(),

    image : null,

    data : null,

    ave : new Array(),

    load : function(url, callback)
    {
        jimp.read(url, function(err, pic)
        {
            if(err != null){return;}

            let picbar = bar.createBar();
            picbar.max = (hl/ch) * (hl/ch);
            picbar.name = "Slicing Picture";

            pic.resize(hl,hl);

            picture.data = new Array();
            for(let x = 0; x < hl; x += ch)
            {
                for(let y = 0; y < hl; y += ch)
                {
                    picture.data.push({chunk : pic.clone().crop(x,y,ch,ch), xpos : x, ypos : y});
                    picbar.delta ++;
                    picbar.draw();
                }
            }
            
            picture.image = pic;

            console.log("loaded picture: " + url + " into memory"); 
            
            callback();
        });
    },

    loadImgs : function(startc, callback)
    {
        console.log("starting to load chunks into memory");

        jimp.read("processpictures/" + startc + ".jpg", (function(err, img) 
        {
            if(err != null )//|| img == undefined)
            {
                console.log("error reading file " + startc + ".jpg into memory");
                console.log("startc: " + startc);
                if(startc >= 0)
                {
                    this.loadImgs(startc - 1, callback);
                }
                else
                {
                    callback();
                }
            }
            else
            {
                console.log("loading img");
                img.resize(ch,ch);
                console.log("done");

                this.picarray.push(img);
                console.log("push done");

                console.log("read file " + startc + ".jpg into memory");

                console.log("startc: " + startc);
                if(startc >= 0)
                {
                     this.loadImgs(startc - 1, callback);
                }
                else
                {
                     callback();
                }
            }
        }).bind(this));    
    },

    compare : function()
    {
        console.log("starting to compare images");

        let arrnum = 0;
        //for(let count = 0; count < this.data.length; count++)
        while(this.data.length > 0)
        {
            console.log("finding position for chunk: " + arrnum);

            let distance = 1000000;

            let position = 0;

            let probar = bar.createBar();
            probar.max = this.data.length;
            probar.name = "Scanning Chunk";

            for(let imgcount = 0; imgcount < this.data.length; imgcount++)
            {
                let tempDist = jimp.distance(this.data[imgcount].chunk, this.picarray[arrnum]);
                let tempdiff = jimp.diff(this.data[imgcount].chunk, this.picarray[arrnum]);

                let tempsum = tempDist + tempdiff;

                console.log("tempsum: " + tempsum);
                if(tempsum < distance)
                {
                    distance = tempsum;

                    position = imgcount;
                }

                probar.delta ++;
                probar.draw();
            }

            let x = this.data[position].xpos;   //Math.floor(position / (hl/ch));
            let y = this.data[position].ypos;   //position % (hl/ch);
            console.log("finished setting x,y: " + x + " - " + y);
            this.image.mask(this.picarray[arrnum], x, y);
            
            console.log("removing chunk from data p: " + position);
            this.data.splice(position, 1);

            arrnum ++;
            if(arrnum >= this.picarray.length)
            {
                arrnum = 0;
            }
        }

        console.log("finished comparing image");
    },

    save : function(name = "output.jpg")
    {
        name = "outputpicture/" + name;

        this.image.write(name);

        console.log("picture saved as: " + name);
    }
};

/*picture.load("test.jpg", function()
{
    console.log("picture done loading");
});*/

exports.pic = picture;


/*jimp.read("processpictures/" + 3 + ".jpg").then((function(img) 
{
    console.log(img);
}));
*/
