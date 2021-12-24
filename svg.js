const generateStats = (data)=>{
    return (`<svg width="330" height="180" xmlns="http://www.w3.org/2000/svg"  version="1.1">
    <style>
    svg {
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif;
        font-size: 14px;
        line-height: 1.5;
    }
    
    #background {
        width: calc(100% - 10px);
        height: calc(100% - 10px);
        fill: #292A2B;
        rx: 8px;
        ry: 8px;
    }
    
    .problems-solved {
        color: rgb(167, 209, 171);
        font-size: 12px;
        font-weight: 500;
    }
    
    .total-solved-count {
        color: white;
        font-weight: bold;
        font-size: 16px;
    }
    
    .bottom {
        position: absolute;
        bottom: 30px;
        color: white;
        display: flex;
        grid-template-columns: auto auto auto;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
        /* padding: 0 10px; */
        padding-right: 35px;
        /* margin-left: -10px; */
        justify-content: center;
    }
    
    .tag {
        color: rgb(167, 209, 171);
        font-size: 12px;
        font-weight: 400;
        text-transform: uppercase;
    }
    
    .count {
        color: white;
        font-weight: 500;
        font-size: 16px;
    }
</style>
<g>
    <rect x="5" y="5" id="background" />
    <g>
        <foreignObject x="21" y="17" width="318" height="176" >
       
            <div xmlns="http://www.w3.org/1999/xhtml"  version="1.1" >
                <div class="topContainer" size="108">
                    <div class="problems-solved">Problems Solved on <a href="#" target="_blank" style="cursor: pointer; color:green;font-size: 15px;">GeeksForGeeks</a></div>
                    <div class="total-solved-count">${data.totalProblemsSolved}</div>
                </div>
                <div class="bottom">
                    <div class="item">
                        <span class="tag">School -</span>
                        <span class="count">${data.School}</span>
                    </div>
                    <div class="item">
                        <span class="tag">Basic -</span>
                        <span class="count">${data.Basic}</span>
                    </div>
                    <div class="item">
                        <span class="tag">Easy -</span>
                        <span class="count">${data.Easy}</span>
                    </div>
                    <div class="item">
                        <span class="tag">Medium -</span>
                        <span class="count">${data.Medium}</span>
                    </div>
                    <div class="item">
                        <span class="tag">Hard -</span>
                        <span class="count">${data.Hard}</span>
                    </div>
                </div>

            </div>
        
        </foreignObject>
    </g>
</g>
</svg>`)

}
export default generateStats;