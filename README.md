<p align="center">
 <h1 align="center">geeksForGeeksStats API - GFG updated UI</h1>
 <p align="center">Dynamically generated GeeksForGeeks stats for your readmes!</p>
</p>

*****

API to get count of total problems solved on [GeeksForGeeks](https://practice.geeksforgeeks.org/) with details.
> you can use this API to show your stats on github profile or any website.

> `node.js`  `express`  `cheerio`
## Preview
![Screenshot 2021-12-24 203043](https://user-images.githubusercontent.com/88178000/147360853-1c573480-399f-4e68-9112-b07e13852100.jpg)
# How to use
 to show in markdown (Github profile) simply copy below code and replace **`<YOUR_USERNAME>`** with your GeeksForGeeks UserName
 - if you have blank space in your userName dont use Blank Space use %20
 > for example if your GeeksForGeeks userName is "narendra dewasi" , then  you'll need to replace <YOUR_USERNAME> with narendra%20dewasi


 > that's it, if you get any error , make sure you have solved at least 1 problem on GFG and cross check username and link 


 > send me message if any error occur [LinkedIn](https://www.linkedin.com/in/narendra-dewasi/)

 ### API END POINT
 ```
 https://geeks-for-geeks-stats-api-napiyo.vercel.app/?raw=<Y/N>&userName=<GFG_USERNAME>
 ```
To get Response in JSON use raw=y query, else dont pass raw

### API RES in JSON
```
{
  "School": 5,
  "Basic": 27,
  "Easy": 56,
  "Medium": 97,
  "Hard": 8,
  "userName": "napiyo",
  "totalProblemsSolved": 193
}
```

#### copy this code 👇🏻
```
[![Narendra's geeksForgeeks stats](https://geeks-for-geeks-stats-api-napiyo.vercel.app/?userName=<YOUR_USERNAME>)](https://github.com/napiyo/geeksForGeeksStatsAPI)
```

## make clickable
by default when you click on stat box you'll redirect to this github. if you want to redirect to your geeksForgeeks profile or any other replace **`<YOUR_LINK_HERE>`**.
> DONT FORGET to replace userName as mentioned before
> dont use `"` in your link , simple paste it
```
[![Narendra's geeksForgeeks stats](https://geeks-for-geeks-stats-api-napiyo.vercel.app/?userName=<YOUR_USERNAME>)](<YOUR_LINK_HERE>)
 ```
 
 
 <br>
 
 # Any contribution to this repo is highly appreciated
 
 <br>
 <br>
 <br>
 
 inspired by [https://github.com/KnlnKS/leetcode-stats](https://github.com/KnlnKS/leetcode-stats)
