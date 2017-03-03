let data = require("./picrequest").data;
let picprocess = require("./picprocess");
let pic = picprocess.pic;

/*data.pushURL("pineapple", function()
{
    data.pushURL("ballet", function()
    {
        data.pushURL("dancing", function()
        {
            data.fillData(function()
            {
                pic.load("test.jpg", function()
                {
                    pic.compare(data.imageData);

                    pic.save("newimage.png");
                });
            });
        });
    });
});*/

/*data.pushURLs(["drug", "psychedelic", "trance", "psychedelic art", "psychedelic trip", "LSD", "DMT"], () =>
{
    data.fillData( () =>
    {
        pic.load("gerrit.jpg", () =>
        {
            pic.compare(data.imageData);
            
            pic.save("neewimage.png");
        });
    });
});*/

/*data.pushURLs(["drug", "psychedelic", "trance", "psychedelic art", "psychedelic trip", "LSD", "DMT"], () =>
{
    data.fillData(() =>
    {
        data.saveData(55, function()
        {
            console.log("whut");
        });
    });
});*/

/*pic.load("inputpicture/gerrit.jpg", () =>
{
    pic.loadImgs(3, () =>
    {
        console.log("finished");

        pic.compare();
        pic.save();
    });
});
*/

let main = function()
{
    if(process.argv[2] != undefined && process.argv[2] == "-download")
    {
        let args = process.argv.slice(3, process.argv.length);

        download(args);
    }
    else if(process.argv[2] != undefined && process.argv[2] == "-process")
    {
        let args = process.argv.slice(3, process.argv.length);

        if(args[4] == undefined || args[4] == null)
        {
            args[4] = 64;
        }
        if(args[5] == undefined || args[5] == null)
        {
            args[5] = 1024;
        }
        
        doprocess(args[0], args[1], args[3],args[4], args[5]);
    }
    else
    {
        console.log("to download pictures use -download and use following parameters as args ---");
        console.log("to process use -process followed by inputname , outputname, piccount and optionally chunksize, picsize ---");
    }
};


let download = function(namearr, callback = function(){})
{
    data.pushURLs(namearr, () =>
    {
        data.fillData(() =>
        {
            data.saveData(0, () =>
            {
                console.log("pictures downloaded");
                callback();
            });
        });
    });
};

let doprocess = function(inputname, outputname, piccount, chunks = 64, pics = 1024, callback = function(){})
{
    picprocess.chunksize = chunks;
    picprocess.picsize = pics;
    pic.load("inputpicture/" + inputname, () =>
    {
        pic.loadImgs(piccount, () =>
        {
            pic.compare();
            pic.save(outputname);
            callback();
        });
    });
};

console.log(process.argv);
main();
                    
/*let jimp = require("jimp");

let testimage = new jimp(255,255, function(err,image){});

testimage.write("lol.png");*/
