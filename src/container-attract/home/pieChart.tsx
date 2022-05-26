import React, {useState, useEffect, useMemo} from 'react'
// import * as echarts from 'echarts/core';
// import { PieSeriesOption,PieChart} from 'echarts/charts';
// import { LabelLayout, UniversalTransition } from 'echarts/features';
// import { CanvasRenderer } from 'echarts/renderers';
// echarts.use([
//     PieChart,
//     // PieSeriesOption,
//     LabelLayout,
//     UniversalTransition,
//     CanvasRenderer
// ]);
import * as echarts from 'echarts';
interface Props {

}
const PieChart: React.FC<Props> = function () {
    useEffect(()=>{
        let myChart = echarts.init(document.getElementById('statsPie'));
        let colors=['#0F89FE','#C28B07','#54872C','#CE7FFF','#FFB913'];
        let isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
        let innerRadius = '55%';
        let outterRadius = '70%';
        
        if (isMobile) {
            console.log('isMobile:', isMobile)
            innerRadius = '35%';
            outterRadius = '50%';
        }
        const option  = {
            color:colors,
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    startAngle:70,
                    radius: [innerRadius, outterRadius],
                    left: 'center',
                    // avoidLabelOverlap: false,
                    width: 700,
                    label: {
                        alignTo: 'none',
                        edgeDistance: 10,
                        color:['#0F89FE','#C28B07','#866FD9','#54872C','#CE7FFF','#FFB913'],
                        formatter:(params) => {
                            return `{name|${params.name}}\n{value|${params.value}%}`
                        },
                        // minMargin: 15,
                        // edgeDistance: 10,
                        lineHeight: 16,
                        rich: {
                            name: {
                                fontSize: 15,
                                fontFamily: "TimesNewRomanPS-BoldMT, TimesNewRomanPS"
                            },
                            value: {
                                fontSize: 13,
                                fontFamily: "TimesNewRomanPS-BoldMT, TimesNewRomanPS"
                            }
                        }
                    },
                    labelLine: {
                        length: 20,
                        length2: 0,
                        maxSurfaceAngle: 180
                    },
                    labelLayout: function (params) {
                        const isLeft = params.labelRect.x < myChart.getWidth() / 2;
                        const points = params.labelLinePoints;
                        points[2][0] = isLeft
                            ? params.labelRect.x
                            : params.labelRect.x + params.labelRect.width;
                        return {
                            labelLinePoints: points
                        };
                    },
                    data: [
                        { value: 0.44,text:'977,777', name: 'Reward Pool and Marketing',label:{color:colors[0]} },
                        { value: 0.44,text:'977,777', name: 'Airdrop',label:{color:colors[1]} },
                        { value: 0.44,text:'977,777', name: 'Presale',label:{color:colors[2]} },
                        { value: 0.44,text:'977,777', name: 'Initial Liquidity',label:{color:colors[3]} },
                        { value: 98.24,text:'218,310,892', name: 'Liquidity Mining',label:{color:'#f7941a'} }
                    ]
                }
            ]
        }
        myChart.setOption(option);

    },[])
    return (
        <>
            <div id="statsPie" style={{width:'100%',height:'100%'}}></div>
            <div className="statsText">
                <p>Total</p>
                <p>222,222,000</p>
            </div>
        </>

    )
}
export default PieChart
