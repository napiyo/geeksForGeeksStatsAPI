// const express = require('express');
import express from 'express';
import request from 'request';
// import { Cheerio } from 'cheerio';
import cheerio from 'cheerio';
// const request = require('request');
// const cheerio = require('cheerio');
// const generateStats = require('./svg');
import generateStats from './svg.js';
const app = express();

app.get('/', function(req, res) {
    let userName = req.query.userName;
    if (!userName) {
        let errorMessage = { "error": "add your geeksForGeeks user Name in link eg /?userName=<YOUR_USER_NAME>" };
        res.send(errorMessage);
    } else {
        // let userName = 'radioactivenarendra';
        let url = 'https://auth.geeksforgeeks.org/user/' + userName + '/practice/';

        request(url, function(error, response, html) {
            // First we'll check to make sure no errors occurred when making the request
            if (!error) {

                // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
                var $ = cheerio.load(html);

                let values = {};
                let problemDificultyTag = ["School", "Basic", "Easy", "Medium", "Hard"];

                let data = $('#problem-solved-div a.mdl-tabs__tab');
                if (data.length == 0) {
                    res.status(400).send({ error: "userName does not exist or not solved any problem on geeksforgeeks" });
                } else {
                    let totalProblemSolved = 0;
                    data.each((i, x) => {
                        let temp = $(x).text();
                        let number = 0;
                        for (let i = temp.length - 1; i > 0; i--) {
                            if (temp[i] == ')') {
                                let j = i - 1;

                                while (temp[j] != '(') {

                                    j--;
                                }
                                number = parseInt(temp.substring(j + 1, i));
                                totalProblemSolved += number;

                                break;
                            }
                        }
                        values[problemDificultyTag[i]] = number;
                    })



                    values["userName"] = userName;
                    values["totalProblemsSolved"] = totalProblemSolved;
                    values["url"] = url;
                    let svg = generateStats(values);
                    res.send(svg);
                }
            } else {
                console.log(error);
            }

        });
    }
});


const port = process.env.PORT || 2001;
app.listen(port, () =>
    console.log(`Server running on ${port}, http://localhost:${port}`)
);

export default app;