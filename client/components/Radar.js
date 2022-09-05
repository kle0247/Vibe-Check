import { ResponsiveRadar } from "@nivo/radar";
import React from "react";

const Radar = ({trackFeatures}) => {
    const data = [];
    trackFeatures.map( track => {
        data.push(
            {
                features: 'danceability',
                feature_value: track.danceability
            },
            {
                features: 'energy',
                feature_value: track.energy
            },
            {
                features: 'valence',
                feature_value: track.valence
            },
            {
                features: 'instrumentalness',
                feature_value: track.instrumentalness
            }
        )
    })

    return(
        <ResponsiveRadar
            data={data}
            keys={[ 'feature_value' ]}
            indexBy="features"
            valueFormat=">-.2f"
            margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
            borderColor={{ from: 'color' }}
            gridLabelOffset={36}
            dotSize={10}
            dotColor={{ theme: 'background' }}
            dotBorderWidth={2}
            colors={{ scheme: 'nivo' }}
            blendMode="multiply"
            motionConfig="wobbly"
            width={700}
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