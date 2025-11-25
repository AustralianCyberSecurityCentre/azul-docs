/**
 * A flash-y background for the Azul homepage.
 */

import dagre from "@dagrejs/dagre";
import { useState } from "react";

type RNG = () => number;

/**
 * The mulberry random number generator. Used for seeded random number generation
 * for deterministic graph generation.
 *
 * @param a The starting seed for the generator.
 * @returns A callable function that returns a random floating point.
 */
function mulberry32(a: number): RNG {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Calculates a random string based on a random number generator.
 *
 * @param generator The generator to use.
 * @returns A random string.
 */
function randomString(generator: RNG): string {
  return generator().toString(36).substring(7);
}

/**
 * The type of node that this is.
 */
const enum NodeType {
  Source = "source",
  Binary = "binary",
  CurrentBinary = "current",
}

const NodeFills: Record<NodeType, string> = {
  source: "oklch(68.1% .162 75.834)",
  binary: "oklch(58.8% .158 241.966)",
  current: "oklch(59.6% .145 163.225)",
};

type NodeId = string;
type Graph = dagre.graphlib.Graph<Node>;

/**
 * A node in the graph.
 */
interface Node {
  label: NodeId;
  width: number;
  height: number;
  type: NodeType;
}

const NODE_WIDTH = 40;
const NODE_HEIGHT = 20;

/**
 * Randomly adds more nodes to an existing graph.
 *
 * @param rng RNG source.
 * @param graph The graph to add nodes to.
 * @param depth Recursive depth for terminating.
 * @param currentNode The name of the current node.
 * @param hasParent If this node has a parent.
 */
function addMoreNodes(
  rng: RNG,
  graph: Graph,
  depth: number,
  currentNode: string,
  hasParent: boolean
) {
  const terminationIndicator = depth / 5;

  let parentNodes = 0;

  // Enforce us never recursing infinitely
  if (terminationIndicator < Math.max(rng(), 0.2)) {
    let nodesToAdd = Math.ceil(rng() * 5);

    for (let i = 0; i < nodesToAdd; i++) {
      const isParent = rng() > 0.6;
      const newNode = randomString(rng);

      graph.setNode(newNode, {
        label: newNode,
        width: NODE_WIDTH,
        height: NODE_HEIGHT,
        type: NodeType.Binary,
      });

      // Recursively add more nodes to this node
      addMoreNodes(rng, graph, depth + 1, newNode, isParent);

      if (isParent) {
        parentNodes += 1;
        graph.setEdge(newNode, currentNode);
      } else {
        graph.setEdge(currentNode, newNode);
      }
    }
  }

  // Determine if a source should be added to this node (if there are no parents, this will need to be done)
  if (!hasParent && parentNodes / 3 < rng()) {
    const parentSource = randomString(rng);
    graph.setNode(parentSource, {
      id: parentSource,
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
      type: NodeType.Source,
    });
    graph.setEdge(parentSource, currentNode);
  }
}

/**
 * A graph that has been laid out and iterated.
 */
interface RenderedGraph {
  width: number;
  height: number;
  nodes: Record<string, dagre.Node<Node>>;
  edges: Record<string, dagre.GraphEdge>;
}

/**
 * Generates a random Dagre graph in the format of a typical Azul graph.
 *
 * @param seed The RNG seed to use for the graph.
 */
function generateGraph(seed: number = 1): RenderedGraph {
  const rng = mulberry32(seed);

  const g: Graph = new dagre.graphlib.Graph<Node>();

  g.setGraph({});
  g.setDefaultEdgeLabel(function () {
    return {};
  });

  // Generate a central node
  const centralNode = randomString(rng);
  g.setNode(centralNode, {
    id: centralNode,
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
    type: NodeType.CurrentBinary,
  });

  // Generate connected nodes
  addMoreNodes(rng, g, 0, centralNode, false);

  // Bake the graph
  dagre.layout(g);

  const nodes: Record<string, dagre.Node<Node>> = {};
  const edges = {};

  g.nodes().forEach(function (v) {
    nodes[v] = g.node(v);
  });
  g.edges().forEach(function (e) {
    edges[e.v + e.w] = g.edge(e);
  });

  let width = 0;
  let height = 0;
  for (const node of Object.values(nodes)) {
    width = Math.max(node.x, width);
    height = Math.max(node.y, height);
  }

  // Handle overlap
  width += NODE_WIDTH;
  height += NODE_HEIGHT;

  return {
    width,
    height,
    nodes,
    edges,
  };
}

export default function Graph() {
  // Precalculate the graph once to reduce complexity
  const [graph, _] = useState(generateGraph());

  return (
    <svg width={graph.width} height={graph.height}>
      {Object.entries(graph.edges).map(([name, path]) => {
        let command = "";

        for (const [index, point] of path.points.entries()) {
          if (index === 0) {
            command += "M";
          } else if (index === 1) {
            command += " S";
          } else {
            command += " ";
          }
          command += point.x + " " + point.y;
        }

        return (
          <path
            d={command}
            key={name}
            fill="transparent"
            stroke="oklch(74.6% .16 232.661 / 0.5)"
            strokeWidth={3}
          />
        );
      })}

      {Object.entries(graph.nodes).map(([name, node]) => (
        <rect
          key={name}
          x={node.x - node.width / 2}
          y={node.y - node.height / 2}
          width={node.width}
          height={node.height}
          rx={node.type === NodeType.Binary ? 2 : 0}
          ry={node.type === NodeType.Binary ? 2 : 0}
          fill={NodeFills[node.type]}
          shapeRendering="geometricPrecision"
        />
      ))}
    </svg>
  );
}
