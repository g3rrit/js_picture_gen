let readline = require("readline");

const rl = readline.createInterface(
{
    input : process.stdin,
    output : process.stdout
});

rl.prompt(true);

let bar = 
{
    name : "Loading",
    startc : "[",
    endc : "]",
    loadc : "#",
    notloadc : "-",
    sep : ":",

    percent : true,
    count : true,

    delta : 0,
    max : 100,
    width : 30,

    draw : function()
    {
        //readline.clearLine(process.stdout,0);
        process.stdout.clearLine(); 

        process.stdout.cursorTo(0);
        let pro = this.getString();

        //readline.moveCursor(process.stdout, -pro.length, 0);

        //rl.write(pro);
        process.stdout.write(pro);


        rl.pause();
    },

    end : function()
    {
        rl.pause();
    },

    getPercent : function()
    {
        return (this.delta/this.max) * 100;
    },

    getString : function()
    {
        let temp = this.name + this.sep + this.startc;

        let per = Math.round(this.getPercent());
        for(let i = 0; i < Math.round((per / 100) * this.width); i++)
        {
            temp += this.loadc;
        }

        for(let i = 0; i < Math.round(((100 - per) / 100) * this.width); i++)
        {
            temp += this.notloadc;
        }

        temp += this.endc + this.sep;

        if(this.percent)
        {
            temp += per + "%" + this.sep;
        }
        
        if(this.count)
        {
            temp += this.delta + "/" + this.max;
        }

        return temp;
    }
}

/*bar.max = 100000;
for(let i = 0; i < bar.max; i++)
{
    bar.draw();
    bar.delta += 1;
}*/

function getBar() 
{
    return Object.create(bar);
}

exports.createBar = getBar;
