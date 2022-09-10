import { ResponsiveBar } from '@nivo/bar'
import React from 'react'

const Bar = ({tracksFeatures}) => {
  const data = []
      let id = 0
      tracksFeatures.map( track => {
        data.push({ 
          id: id,
          danceability: track.danceability, 
          energy: track.energy, 
          valence: track.valence,
          instrumentalness: track.instrumentalness,
          acousticness: track.acousticness
        })
        id++
  })

  return(
    <ResponsiveBar
        data={data}
        keys={[
            'danceability',
            'energy',
            'valence',
            'instrumentalness',
            'acousticness'
        ]}
        enableLabel={false}
        indexBy="id"
        margin={{ top: 50, right: 140, bottom: 50, left: 80 }}
        padding={0.2}
        // groupMode={'grouped'}
        width={500}
        height={500}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'features',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
    />
  )
}

export default Bar