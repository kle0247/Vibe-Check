import { ResponsiveRadar } from "@nivo/radar";
import React from "react";

const Radar = ({trackFeatures}) => {
    const data = [];
    trackFeatures.map( track => {
        data.push(
            {
                keys: 'danceability',
                features: track.danceability
            },
            {
                keys: 'energy',
                features: track.energy
            },
            {
                keys: 'valence',
                features: track.valence
            },
            {
                keys: 'instrumentalness',
                features: track.instrumentalness
            },
            {
                keys: 'acousticness',
                features: track.acousticness
            }
        )
    })

    return(
        <ResponsiveRadar
            data={data}
            keys={[ 'features' ]}
            indexBy="keys"
            valueFormat=">-.2f"
            margin={{ top: 70, right: 100, bottom: 30, left: 150 }}
            borderColor={{ from: 'color' }}
            gridLabelOffset={36}
            dotSize={10}
            dotColor={{ theme: 'background' }}
            dotBorderWidth={2}
            colors={{ scheme: 'nivo' }}
            blendMode="multiply"
            motionConfig="wobbly"
            width={500}
            height={500}
            legends={[
                {
                    anchor: 'top-left',
                    direction: 'column',
                    translateX: -50,
                    translateY: -40,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemTextColor: '#999',
                    symbolSize: 12,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    )
}

export default Radar