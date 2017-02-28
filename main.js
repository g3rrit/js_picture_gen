let data = require("./picrequest").data;
let pic = require("./picprocess").pic;

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

pic.load("gerrit.jpg", () =>
{
    pic.loadImgs(3, () =>
    {
        console.log("finished");

        pic.compare();
        pic.save();
    });
});




                    
/*let jimp = require("jimp");

let testimage = new jimp(255,255, function(err,image){});

testimage.write("lol.png");*/
