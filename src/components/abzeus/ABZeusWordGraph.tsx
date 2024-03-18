import { Key, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';

import * as d3 from "d3";
import { IABZeusGraphData } from '@/interfaces/IABZeusGraphData';

export interface IWordGraph {
    abZeusWordGraph: IABZeusGraphData,
    width: number,
    height: number,
    rootId?: Key,
    style?: any
}

export interface IWordGraphImperativeCalls {
    screenshot: () => any;
    getGraph: any;

}

const ABZeusWordGraph: React.ForwardRefRenderFunction<IWordGraphImperativeCalls, IWordGraph> = (props, ref) => {

    const { abZeusWordGraph, width, height, rootId, style } = props;
    const defaultContainerStyles = { width, height }
    const containerProps = { style: { ...style, ...defaultContainerStyles } || { ...defaultContainerStyles } }

    const [internalRootId, setInternalRootId] = useState<Key>(() => rootId || 0)

    //const [processedABZeusWordGraph,setProcessedABZeusWordGraph] = useState<IABZeusGraphData>()
    const _graph = useRef<IABZeusGraphData>();

    const fgRef = useRef();

    const inputRef = useRef<IWordGraphImperativeCalls>(null);

    const nodesById = useMemo(() => {

        const clonedABZeusGraph: IABZeusGraphData = Object.create(abZeusWordGraph);
        const nodesById = Object.fromEntries(clonedABZeusGraph.nodes.map(node => [node.id, node]));

        const modifiedNodes = clonedABZeusGraph.nodes.map(node => {
            const _node = { ...node, collapsed: node.id !== internalRootId };

            if (_node.id === internalRootId) {
                _node.label = "";
                _node.name = "";
            }

            _node.childLinks = [];

            return _node
        });


        clonedABZeusGraph.links.forEach(link => {
            try {
                modifiedNodes[link.source].childLinks.push(link)
            } catch (e) {
                console.error(e);
            }
        });

        _graph.current = { nodes: modifiedNodes, links: clonedABZeusGraph.links };

        return nodesById;

    }, [abZeusWordGraph, internalRootId]);

    /*const getPrunedTree = useCallback(() => {
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

    const [prunedTree, setPrunedTree] = useState(getPrunedTree());*/


    const NodeComponent = (node, ctx, globalScale) => {

        if (node.type === "trini") {
            /*ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.beginPath();
            ctx.arc(Number(node.x), Number(node.y), 12, 0, 2 * Math.PI);
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;*/
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

    /*const handleNodeClick = useCallback(node => {
        node.collapsed = !node.collapsed; // toggle collapse state
        const updatedTree = getPrunedTree();
        setPrunedTree(updatedTree)
    }, []);*/

    useEffect(() => {
        if (fgRef && fgRef.current) {
            fgRef.current.zoom(3);
            // fgRef.current.centerAt({ x: width/2, y: 300});
            //fgRef.current.centerAt(-5, -10);

            //fgRef.current.zoomToFit();

        }
        /*if(processedABZeusWordGraph) {
            setInternalRootId(processedABZeusWordGraph.nodes[0].id);
        }*/
    }, [fgRef])

    useImperativeHandle(ref, () => ({
        screenshot: () => {
            if (fgRef.current) {

                //fgRef.current.centerAt(0,0);
                //fgRef.current.zoomToFit();

                let cropRect = fgRef.current.getGraphBbox();

                //fgRef.current.centerAt(-cropRect.x[0]/2,-cropRect.y[0]/2);

                //fgRef.current.zoomToFit();
                cropRect = fgRef.current.getGraphBbox();


                const canvas = document.getElementsByClassName("force-graph-container")[0].childNodes[0];

                const croppedCanvas = document.createElement('canvas');
                croppedCanvas.width = cropRect.x[1] - cropRect.x[0];
                croppedCanvas.height = cropRect.y[1] - cropRect.y[0];
                const croppedCtx = croppedCanvas.getContext('2d');

                croppedCtx.drawImage(
                    canvas,
                    cropRect.x[0],
                    cropRect.y[0],
                    croppedCanvas.width,
                    croppedCanvas.height,
                    0,
                    0,
                    croppedCanvas.width,
                    croppedCanvas.height
                );


                const canvasURL = canvas.toDataURL();

                //fgRef.current.zoom(1);

                return canvasURL;
            }
            return null;
        },
        getGraph: () => {
            return fgRef.current
        }
    }));

    const hierarchy = _graph.current ? d3.stratify()
        .id(d => d.id)
        .parentId(d => d.parent)(_graph.current.nodes) : null

    return _graph.current && _graph.current.nodes && hierarchy ? <div className='ABZeusGraph'>

        <div className='background'  {...containerProps}></div>
        <div className='graph'> <ForceGraph2D

            ref={fgRef}
            width={width}
            height={height}
            d3Hierarchy={hierarchy}
            graphData={{
                nodes: _graph.current.nodes.map((item: any) => Object.assign({}, item)),
                links: _graph.current.links.map((item: any) => Object.assign({}, item))
            }}
            nodeCanvasObjectMode={() => "after"}
            nodeCanvasObject={NodeComponent}
            nodeLabel={"translation"}
            //linkCanvasObject={LinkComponent}
            linkCanvasObjectMode={() => "before"}
            nodeColor={node => { 
                if(node.type === "trini") {
                    return "transparent"
                }
                return !node.childLinks.length ? '#c9c9c9' : node.collapsed ? '#c6c6c6' : '#d1d1d1' }
            }

            enableZoomInteraction={false}
            enablePanInteraction={false}
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
            nodeRelSize={11}
            nodeVal={(node) => node.value}
            {...props}
        /> </div>
    </div> : <></>

}

const ABZeusWordGraphRef = forwardRef<IWordGraphImperativeCalls, IWordGraph>(ABZeusWordGraph);

export default ABZeusWordGraphRef
