import { useEffect, useRef, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import * as d3 from "d3";

const WordGraph = ({ abZeusWordGraph, ...props }: { abZeusWordGraph: any, props: any }) => {

    const fgRef = useRef();

    return abZeusWordGraph ? <ForceGraph2D

        ref={fgRef}
        graphData={abZeusWordGraph}
        /*rendererConfig={{
            alpha: true,
        }}*/
        /*
        backgroundColor={'rgba(0,0,0,0)'}
        */
        //showNavInfo={false}
        nodeAutoColorBy="module"
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={2}
        d3VelocityDecay={0.3}


        linkColor={() => 'rgba(0,0,0,1)'}
        linkWidth={1}
        nodeColor={() => 'rgba(0,0,0,1)'}

        //nodeCanvasObject={ABZeusNode}
        nodeCanvasObjectMode={() => "replace"}
        nodeCanvasObject={(node, ctx) => {

            if (node.type === "trini") {
                // Set the fill style to white
                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';

                // Draw a circle with a radius of 50 pixels
                ctx.beginPath();
                ctx.arc(Number(node.x), Number(node.y), 20, 0, 2 * Math.PI);
                ctx.fill();

                // Set the stroke style to black
                ctx.strokeStyle = 'black';

                // Set the line width to 1 pixel
                ctx.lineWidth = 1;

                // Draw a circle with a radius of 50 pixels
                /*ctx.beginPath();
                ctx.arc(Number(node.x), Number(node.y), 20, 0, 2 * Math.PI);
                ctx.stroke();*/
            } else {

                ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';


                // Draw a circle with a radius of 50 pixels
                ctx.beginPath();
                ctx.arc(Number(node.x), Number(node.y), 10, 0, 2 * Math.PI);
                ctx.fill();

                // Set the stroke style to black
                ctx.strokeStyle = 'black';

                // Set the line width to 1 pixel
                ctx.lineWidth = 1;

                // Draw a circle with a radius of 50 pixels
                /*ctx.beginPath();
                ctx.arc(Number(node.x), Number(node.y), 10, 0, 2 * Math.PI);
                ctx.stroke();*/

                ctx.fillStyle = 'black';
                ctx.beginPath();
                ctx.arc(Number(node.x - 10), Number(node.y - 12), 7, 0, 2 * Math.PI);
                ctx.fill();

                ctx.font = '18px ABZeus';
                ctx.fillStyle = 'white';
                if (node.type === "suj") {
                    ctx.fillText('E', Number(node.x - 10), Number(node.y - 11));
                }
                if (node.type === "eto") {
                    ctx.fillText('O', Number(node.x - 10), Number(node.y - 11));
                }
                if (node.type === "obj") {
                    ctx.fillText('e', Number(node.x - 10), Number(node.y - 11));
                }

            }



            // Set the stroke style to black
            ctx.strokeStyle = 'black';

            // Set the line width to 1 pixel
            ctx.lineWidth = 1;
            //ctx.fillStyle = 'white';
            //ctx.fillText('Label',  Number(node.x), Number(node.y));


            const label = `${node.name}`;
            const fontSize = 20;
            ctx.font = `${fontSize}px ABZeus`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = node.isClusterNode ? "white" : "black"; //node.color;
            ctx.fillText(label, Number(node.x), Number(node.y));
        }}
        //nodeRelSize={12}
        nodeVal={(node) => node.value}

        {...props}


    //nodeColor={(node) => node.color}

    /> : <></>

}

export default WordGraph;

