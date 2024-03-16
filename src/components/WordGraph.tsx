import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';

import * as d3 from "d3";
import { IABZeusGraphData } from '@/interfaces/IABZeusGraphData';

const WordGraph = ({ abZeusWordGraph, width, height, ...props }: { abZeusWordGraph: IABZeusGraphData, width: number, height: number }) => {

    const rootId = abZeusWordGraph.nodes[0].id;

    const fgRef = useRef();

    const nodesById = useMemo(() => {
        const nodesById = Object.fromEntries(abZeusWordGraph.nodes.map(node => [node.id, node]));

        // link parent/children
        abZeusWordGraph.nodes.forEach(node => {
            node.collapsed = node.id !== rootId;
            node.childLinks = [];
        });
        abZeusWordGraph.links.forEach(link => nodesById[link.source].childLinks.push(link));

        return nodesById;
    }, [abZeusWordGraph.links, abZeusWordGraph.nodes, rootId]);

    const getPrunedTree = useCallback(() => {
        const visibleNodes = [];
        const visibleLinks = [];
        (function traverseTree(node = nodesById[rootId]) {
            visibleNodes.push(node);
            if (node.collapsed) return;
            visibleLinks.push(...node.childLinks);
            node.childLinks
                .map(link => ((typeof link.target) === 'object') ? link.target : nodesById[link.target]) // get child node
                .forEach(traverseTree);
        })();

        return { nodes: visibleNodes, links: visibleLinks };
    }, [nodesById]);

    const [prunedTree, setPrunedTree] = useState(getPrunedTree());

    
    const NodeComponent = (node, ctx) => {

        if (node.type === "trini") {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.beginPath();
            ctx.arc(Number(node.x), Number(node.y), 20, 0, 2 * Math.PI);
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
        } else {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.beginPath();
            ctx.arc(Number(node.x), Number(node.y), 10, 0, 2 * Math.PI);
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc((Number(node.x) - 10), Number(Number(node.y) - 12), 7, 0, 2 * Math.PI);
            ctx.fill();
            ctx.font = '18px ABZeus';
            ctx.fillStyle = 'white';
            if (node.type === "suj") {
                ctx.fillText('E', Number(Number(node.x) - 10), Number(Number(node.y) - 11));
            }
            if (node.type === "eto") {
                ctx.fillText('O', Number(Number(node.x) - 10), Number(Number(node.y) - 11));
            }
            if (node.type === "obj") {
                ctx.fillText('e', Number(Number(node.x) - 10), Number(Number(node.y) - 11));
            }
        }
        ctx.strokeStyle = 'black';
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

    }

    const handleNodeClick = useCallback(node => {
        node.collapsed = !node.collapsed; // toggle collapse state
        const updatedTree = getPrunedTree();
        setPrunedTree(updatedTree)
    }, []);


    const hierarchy = d3.stratify()
        .id(d => d.id)
        .parentId(d => d.parent)(abZeusWordGraph.nodes);

    return abZeusWordGraph ? <ForceGraph2D
        ref={fgRef}
        width={width}
        height={height}
        d3Hierarchy={hierarchy}
        graphData={abZeusWordGraph}
        nodeCanvasObjectMode={() => "after"}
        nodeCanvasObject={NodeComponent}
        //linkCanvasObject={LinkComponent}
        linkCanvasObjectMode={()=>"before"}
        nodeColor={node => !node.childLinks.length ? '#333' : node.collapsed ? '#666' : '#999'}
        //nodeComponent={NodeComponent}
        //linkComponent={LinkComponent}
        //dagMode={controls['DAG Orientation']}
        //dagMode={'radialout'}
        //dagLevelDistance={10}
        //d3Force="charges"
        //d3ForceStrength={-1500}
        //d3ForceCollide={(node) => node.group}
        //onNodeClick={handleNodeClick}
        //showNavInfo={false}
        nodeAutoColorBy="module"
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.4}
        linkDirectionalParticles={1}
        linkDirectionalParticleWidth={2}
        d3VelocityDecay={0.2}
        linkColor={() => 'rgba(0,0,0,1)'}
        linkWidth={1}
        nodeRelSize={16}
        nodeVal={(node) => node.value}
        {...props}
    /> : <></>

}

export default WordGraph;