import express, { raw } from 'express';
import request from 'request';
import cheerio from 'cheerio';
import generateStats from './svg.js';
const app = express();

// Get SVG of the User Data
app.get('/', function (req, res) {
    let userName = req.query.userName;
    if (!userName) {
        let errorMessage = { "error": "add your geeksForGeeks user Name in link eg /?userName=<YOUR_USER_NAME>" };
        res.send(errorMessage);
    } else {
        let values = {};
        fetchGFGUserData(userName, function (err, result) {
            if (err) {
                res.status(400).send(err);
            } else {
                values = result
                let svg = generateStats(values);
                res.setHeader("Content-Type", "image/svg+xml");
                res.setHeader("Cache-Control", "s-max-age=60, stale-while-revalidate");
                res.send(svg);
            }
        });


    }
});


// Get Raw Json data of the User
app.get('/raw', function (req, res) {
    let userName = req.query.userName;
    if (!userName) {
        let errorMessage = { "error": "add your geeksForGeeks user Name in link eg /?userName=<YOUR_USER_NAME>" };
        res.send(errorMessage);
    } else {
        fetchGFGUserData(userName, function (err, result) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.json(result);
            }
        });
    }
});


// Private Mehtods
function fetchGFGUserData(userName, callback) {
    let url = "https://auth.geeksforgeeks.org/user/" + userName + "/practice/";
    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            let values = {};
            let problemDificultyTag = ["School", "Basic", "Easy", "Medium", "Hard"];
            let k = 0;
            // GFG updated UI
            let data = $('.tabs.tabs-fixed-width.linksTypeProblem');

            if (data.length == 0) {
                res.status(400).send({ error: "userName does not exist or not solved any problem on geeksforgeeks" });
            } else {
                let totalProblemSolved = 0;
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
                values["totalProblemsSolved"] = totalProblemSolved;
                values["userName"] = userName;
                // old structure of GFG
                // data.each((i, x) => {
                //     let temp = $(x).text();
                //     let number = 0;
                //     console.log(temp);
                //     for (let i = temp.length - 1; i > 0; i--) {
                //         if (temp[i] == ')') {
                //             let j = i - 1;

                //             while (temp[j] != '(') {

                //                 j--;
                //             }
                //             number = parseInt(temp.substring(j + 1, i));
                //             totalProblemSolved += number;

                //             break;
                //         }
                //     }
                //     values[problemDificultyTag[i]] = number;
                // })
            }
            callback(null, values);
        } else {
            callback({ error: "Failed to Fetch the Data" }, null);
            console.log(error);
        }
    });
}



const port = process.env.PORT || 2001;
app.listen(port, () =>
    console.log(`Server running on ${port}, http://localhost:${port}`)
);

export default app;