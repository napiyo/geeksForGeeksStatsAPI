import express, { raw } from 'express';
import request from 'request';
import cheerio from 'cheerio';
import generateStats from './svg.js';
import cors from 'cors';

const app = express();
app.use(cors());
let validateQuery = (req, res, next) => {
    if (!req.query.userName) return res.send({ "error": "add your geeksForGeeks user Name in link eg /?userName=<YOUR_USER_NAME>" });
    next()
}

let getStat = (req, res, next) => {
    let url = "https://auth.geeksforgeeks.org/user/" + req.query.userName + "/practice/";
    request(url, function(error, response, html) {
        if (error) return res.status(502).send(error.errorMessage);
        var $ = cheerio.load(html);
        let values = {};
        let problemDificultyTag = ["School", "Basic", "Easy", "Medium", "Hard"];
        let k = 0,
            totalProblemSolved = 0;
        let data = $('.tabs.tabs-fixed-width.linksTypeProblem');

        if (data.length == 0) return res.status(400).send({ error: "userName does not exist or not solved any problem on geeksforgeeks" });


        let rawData = $(data[0]).text();
        for (let i = 0; i < rawData.length; i++) {
            if (rawData[i] == '(') {
                let tempStart = i + 1;
                while (rawData[i] != ')') {
                    i++;
                }
                let tempProblems = parseInt(rawData.substring(tempStart, i));
                values[problemDificultyTag[k++]] = tempProblems;
                totalProblemSolved += tempProblems;

            }
        }
        values["userName"] = req.query.userName;
        values["totalProblemsSolved"] = totalProblemSolved;
        req.values = values;
        next()
    })
}
let sendStat = (req, res, next) => {
    if (req.query.raw?.toLowerCase() == "y") return res.send(req.values);
    let svg = generateStats(req.values);
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "s-max-age=60, stale-while-revalidate");
    res.send(svg);
}

app.get('/', validateQuery, getStat, sendStat);

const port = process.env.PORT || 2001;
app.listen(port, () =>
    console.log(`Server running on ${port}, http://localhost:${port}`)
);

export default app;