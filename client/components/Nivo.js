import { ResponsivePie } from '@nivo/pie'
// import { ResponsiveWaffle } from '@nivo/circle-waffle'
import React from 'react'

let segments = [
    {
      "id": "erlang",
      "label": "erlang",
      "value": 58,
      "color": "hsl(110, 70%, 50%)"
    },
    {
      "id": "scala",
      "label": "scala",
      "value": 346,
      "color": "hsl(117, 70%, 50%)"
    },
    {
      "id": "java",
      "label": "java",
      "value": 475,
      "color": "hsl(235, 70%, 50%)"
    },
    {
      "id": "css",
      "label": "css",
      "value": 460,
      "color": "hsl(40, 70%, 50%)"
    },
    {
      "id": "haskell",
      "label": "haskell",
      "value": 326,
      "color": "hsl(193, 70%, 50%)"
    },
    {
      "id": "c",
      "label": "c",
      "value": 453,
      "color": "hsl(67, 70%, 50%)"
    },
    {
      "id": "hack",
      "label": "hack",
      "value": 288,
      "color": "hsl(253, 70%, 50%)"
    },
    {
      "id": "lisp",
      "label": "lisp",
      "value": 329,
      "color": "hsl(94, 70%, 50%)"
    },
    {
      "id": "elixir",
      "label": "elixir",
      "value": 26,
      "color": "hsl(52, 70%, 50%)"
    },
    {
      "id": "make",
      "label": "make",
      "value": 110,
      "color": "hsl(110, 70%, 50%)"
    },
    {
      "id": "php",
      "label": "php",
      "value": 338,
      "color": "hsl(281, 70%, 50%)"
    },
    {
      "id": "sass",
      "label": "sass",
      "value": 372,
      "color": "hsl(71, 70%, 50%)"
    }
]

const Waffle = ({track}) => {
        
        return(
        <ResponsiveWaffle
            data={sections}
            total={100}
            rows={18}
            columns={14}
            margin={{ top: 10, right: 10, bottom: 10, left: 120 }}
            colors={{ scheme: 'nivo' }}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.3
                    ]
                ]
            }}
            animate={true}
            motionStiffness={90}
            motionDamping={11}
            legends={[
                {
                    anchor: 'top-left',
                    direction: 'column',
                    justify: false,
                    translateX: -100,
                    translateY: 0,
                    itemsSpacing: 4,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    itemTextColor: '#777',
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000',
                                itemBackground: '#f7fafb'
                            }
                        }
                    ]
                }
            ]}
        />)
}
 
const Pie = ({track}) => {
    let segmentsArray  = []
    let id = 0
        
    track.map( track => {
        segmentsArray.push({id: id, label: `${id}`, duration: track.duration })
    id++

    })  
    return(
        <ResponsivePie 
            data={segmentsArray}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={1}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            // fill={[
            //     {
            //         match: {
            //             id: 'ruby'
            //         },
            //         id: 'dots'
            //     },
            //     {
            //         match: {
            //             id: 'c'
            //         },
            //         id: 'dots'
            //     },
            //     {
            //         match: {
            //             id: 'go'
            //         },
            //         id: 'dots'
            //     },
            //     {
            //         match: {
            //             id: 'python'
            //         },
            //         id: 'dots'
            //     },
            //     {
            //         match: {
            //             id: 'scala'
            //         },
            //         id: 'lines'
            //     },
            //     {
            //         match: {
            //             id: 'lisp'
            //         },
            //         id: 'lines'
            //     },
            //     {
            //         match: {
            //             id: 'elixir'
            //         },
            //         id: 'lines'
            //     },
            //     {
            //         match: {
            //             id: 'javascript'
            //         },
            //         id: 'lines'
            //     }
            // ]}
        //     legends={[
        //         {
        //             anchor: 'bottom',
        //             direction: 'row',
        //             justify: false,
        //             translateX: 0,
        //             translateY: 56,
        //             itemsSpacing: 0,
        //             itemWidth: 100,
        //             itemHeight: 18,
        //             itemTextColor: '#999',
        //             itemDirection: 'left-to-right',
        //             itemOpacity: 1,
        //             symbolSize: 18,
        //             symbolShape: 'circle',
        //             effects: [
        //                 {
        //                     on: 'hover',
        //                     style: {
        //                         itemTextColor: '#000'
        //                     }
        //                 }
        //             ]
        //         }
        // ]}
    />

    )
}

export default Pie