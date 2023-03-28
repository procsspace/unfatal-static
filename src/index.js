const express = require('express');
const app = express();
const dotenv = require("dotenv");
const Convter = require("./utils/converter");
const converter = new Convter();
dotenv.config();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const Startup = require('./utils/startup');
const startup = new Startup();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).json({
        memes: {
            root: "/memes",
            meme: "/meme/:id"
        },
        images: {
            root: "/images",
            image: "/image/:id"
        },
        videos: {
            root: "/media",
            video: "/media/:id"
        },
        status: "/status",
        stats: "/stats"
    });
});


app.get("/memes", (req, res) => {
    const memes = fs.readdirSync(path.join(__dirname, "public", "memes")).map(meme => {
        return {
            id: meme.split(".")[0],
            name: meme.split(".")[1],
            url: `/meme/${meme}`
        }
    })

    res.status(200).render('memes', {
        memes: memes
    })

});

app.get("/meme/:id", (req, res) => {
    var id = req.params.id;
    const ogid = req.params.id;
    if (!id) return res.status(400).json({
        error: "No id provided"
    })

    if (!id.includes(".")) {
        return res.status(400).json({
            error: "No id provided"
        })
    }

    const meme = fs.readdirSync(path.join(__dirname, "public", "memes")).find(meme => meme.split(".")[0] === id)
    const image = fs.readFileSync(path.join(__dirname, "public", "memes", meme))
    const exetension = meme.split(".")[1]
    if (!meme) return res.status(404).json({
        error: "Meme not found"
    })

    console.log(meme)

    res.writeHead(200, { 'Content-Type': `image/${exetension}` });

    res.end(image, 'binary');

});

app.get("/media", (req, res) => {
    const media = fs.readdirSync(path.join(__dirname, "public", "media")).map(media => {
        return {
            id: media.split(".")[0],
            name: media.split(".")[1],
            url: `/media/${media}`
        };
    });

    res.status(200).render('media', {
        media: media
    })
});


app.get("/media/:id", (req, res) => {
    var id = req.params.id;
    const ogid = req.params.id;
    if (!id) return res.status(400).json({
        error: "No id provided"
    })

    if (!id.includes(".")) {
        return res.status(400).json({
            error: "No id provided"
        })
    }

    const media = fs.readdirSync(path.join(__dirname, "public", "media")).find(media => media.split(".")[0] === id)
    const image = fs.readFileSync(path.join(__dirname, "public", "media", media))
    const exetension = media.split(".")[1]
    if (!media) return res.status(404).json({
        error: "media not found"
    })

    console.log(media)

    res.writeHead(200, { 'Content-Type': `video/${exetension}` });

    res.end(image, 'binary');

});

app.get("/image", (req, res) => {
    const images = fs.readdirSync(path.join(__dirname, "public", "images")).map(image => {
        return {
            id: image.split(".")[0],
            name: image.split(".")[1],

            url: `/image/${image}`
        };
    });

    res.status(200).render('images', {
        images: images
    })
});

app.get("/image/:id", (req, res) => {
    var id = req.params.id;
    const ogid = req.params.id;
    if (!id) return res.status(400).json({
        error: "No id provided"
    })

    if (!id.includes(".")) {
        return res.status(400).json({
            error: "No id provided"
        })
    }

   
    const image = fs.readFileSync(path.join(__dirname, "public", "images", id))
    // The image is base64 encoded, but we still need the data (File extension)
    const exetension = id.split(".")[1]

    res.writeHead(200, { 'Content-Type': `image/${exetension}` });

    res.end(image, 'binary');

})




app.get('/status', (req, res) => {


    res.status(200).json({
        uptime: converter.uptime(process.uptime()),
    })
});

app.get('/stats', (req, res) => {

    const stats = {
        cpu: {
            user: {
                converted: converter.cpu(process.cpuUsage().user),
                percentage: converter.percentage(process.cpuUsage().user),
                total: converter.cpu(process.cpuUsage().user)
            },
            system: {
                converted: converter.cpu(process.cpuUsage().system),
                percentage: converter.percentage(process.cpuUsage().system),
                total: converter.cpu(process.cpuUsage().system)
            }
        },
        memory: {
            rss: {
                converted: converter.memory(process.memoryUsage().rss),
                percentage: converter.percentage(process.memoryUsage().rss),
                total: converter.memory(process.memoryUsage().rss)
            },
            heapTotal: {
                converted: converter.memory(process.memoryUsage().heapTotal),
                percentage: converter.percentage(process.memoryUsage().heapTotal),
                total: converter.memory(process.memoryUsage().heapTotal)
            },
            heapUsed: {
                converted: converter.memory(process.memoryUsage().heapUsed),
                percentage: converter.percentage(process.memoryUsage().heapUsed),
                total: converter.memory(process.memoryUsage().heapUsed)
            },
            external: {
                converted: converter.memory(process.memoryUsage().external),
                percentage: converter.percentage(process.memoryUsage().external),
                total: converter.memory(process.memoryUsage().external)
            },
            arrayBuffers: {
                converted: converter.memory(process.memoryUsage().arrayBuffers),
                percentage: converter.percentage(process.memoryUsage().arrayBuffers),
                total: converter.memory(process.memoryUsage().arrayBuffers)
            },
        },
        uptime: {
            uptime: process.uptime(),
            total: converter.uptime(process.uptime())
        },
        version: process.version,
        platform: process.platform,
        arch: process.arch,
        versions: process.versions,
    }


    res.status(200).json(stats)
});




app.listen(port, () => {
    console.clear();
    console.log(`Server is running on port ${port}`)
    startup.checkForInvalidFiles({ verbose: false });

});