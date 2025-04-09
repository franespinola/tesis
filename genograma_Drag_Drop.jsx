import React, { useCallback, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  getSmoothStepPath
} from "reactflow";
import "reactflow/dist/style.css";

/** ========================
 *  Nodo editable (Ej. "Paciente")
 * ======================== */
const EditableNode = ({ data, id, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data?.label || "");

  const handleBlur = () => {
    setEditing(false);
    if (typeof onEdit === "function") {
      onEdit(id, label);
    }
  };

  return (
    <div
      style={{
        padding: 10,
        background: "#e0f7fa",
        borderRadius: 10,
        border: "1px solid #0288d1",
        minWidth: 80,
        textAlign: "center",
        position: "relative"
      }}
    >
      {/* NUEVOS HANDLES (arriba y abajo) */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#555" }}
      />

      {/* HANDLES ORIGINALES (izquierda y derecha) */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
      />

      {editing ? (
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          style={{ textAlign: "center" }}
        />
      ) : (
        <div onDoubleClick={() => setEditing(true)}>
          <div style={{ fontWeight: "bold", marginBottom: 4 }}>ID: {id}</div>
          {data.label}
        </div>
      )}
    </div>
  );
};

/** ========================
 *  Nodos “genéricos”
 * ======================== */

/** NODO Masculino */
const MasculinoNode = ({ data, id }) => {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data?.label || "");

  const handleBlur = () => {
    setEditing(false);
    if (data?.onEdit) {
      data.onEdit(id, label);
    }
  };

  return (
    <div
      style={{
        width: 60,
        height: 60,
        background: "#ddd6fe",
        border: "2px solid #4f46e5",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* Handles arriba y abajo */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#555" }}
      />

      {/* Handles izquierda y derecha */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
      />

      {editing ? (
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          style={{ textAlign: "center" }}
        />
      ) : (
        <div onDoubleClick={() => setEditing(true)}>
          <small style={{ display: "block" }}>ID: {id}</small>
          {data.label}
        </div>
      )}
    </div>
  );
};

/** NODO Femenino */
const FemeninoNode = ({ data, id }) => {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data?.label || "");

  const handleBlur = () => {
    setEditing(false);
    if (data?.onEdit) {
      data.onEdit(id, label);
    }
  };

  return (
    <div
      style={{
        width: 60,
        height: 60,
        borderRadius: "999px",
        background: "#fbcfe8",
        border: "2px solid #be185d",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* Arriba / Abajo */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#555" }}
      />

      {/* Izquierda / Derecha */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
      />

      {editing ? (
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          style={{ textAlign: "center" }}
        />
      ) : (
        <div onDoubleClick={() => setEditing(true)}>
          <small style={{ display: "block" }}>ID: {id}</small>
          {data.label}
        </div>
      )}
    </div>
  );
};

/** NODO Fallecido Masculino */
const FallecidoMNode = ({ data, id }) => {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data.label || "");

  const handleBlur = () => {
    setEditing(false);
    if (data.onEdit) {
      data.onEdit(id, label);
    }
  };

  return (
    <div
      style={{
        width: 60,
        height: 60,
        background: "#fee2e2",
        border: "2px solid #7f1d1d",
        position: "relative",
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* Handles */}
      <Handle type="target" position={Position.Top} style={{ background: "#555" }} />
      <Handle type="source" position={Position.Bottom} style={{ background: "#555" }} />
      <Handle type="target" position={Position.Left} style={{ background: "#555" }} />
      <Handle type="source" position={Position.Right} style={{ background: "#555" }} />

      {/* Ajustamos el SVG para que la cruz no se salga del recuadro */}
      <svg
        width="48"
        height="48"
        style={{ position: "absolute", top: 6, left: 6 }}
      >
        <line x1="0" y1="0" x2="48" y2="48" stroke="#7f1d1d" strokeWidth="2" />
        <line x1="48" y1="0" x2="0" y2="48" stroke="#7f1d1d" strokeWidth="2" />
      </svg>

      {editing ? (
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          style={{ textAlign: "center" }}
        />
      ) : (
        <div onDoubleClick={() => setEditing(true)} style={{ paddingTop: 40 }}>
          <small style={{ display: "block" }}>ID: {id}</small>
          {label}
        </div>
      )}
    </div>
  );
};

/** NODO Fallecido Femenino */
const FallecidoFNode = ({ data, id }) => {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data.label || "");

  const handleBlur = () => {
    setEditing(false);
    if (data.onEdit) {
      data.onEdit(id, label);
    }
  };

  return (
    <div
      style={{
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: "#fff1f2",
        border: "2px solid #be123c",
        position: "relative",
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: "#555" }} />
      <Handle type="source" position={Position.Bottom} style={{ background: "#555" }} />
      <Handle type="target" position={Position.Left} style={{ background: "#555" }} />
      <Handle type="source" position={Position.Right} style={{ background: "#555" }} />

      {/* Cruz ligeramente más pequeña y centrada */}
      <svg
        width="48"
        height="48"
        style={{ position: "absolute", top: 6, left: 6 }}
      >
        <line x1="0" y1="0" x2="48" y2="48" stroke="#be123c" strokeWidth="2" />
        <line x1="48" y1="0" x2="0" y2="48" stroke="#be123c" strokeWidth="2" />
      </svg>

      {editing ? (
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          style={{ textAlign: "center" }}
        />
      ) : (
        <div onDoubleClick={() => setEditing(true)} style={{ paddingTop: 40 }}>
          <small style={{ display: "block" }}>ID: {id}</small>
          {label}
        </div>
      )}
    </div>
  );
};

/** NODO Embarazo */
const EmbarazoNode = ({ data, id }) => {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data?.label || "E"); // Por defecto "E"

  const handleBlur = () => {
    setEditing(false);
    if (data?.onEdit) {
      data.onEdit(id, label);
    }
  };

  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: "#fffbe6",
        border: "2px dashed #facc15",
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 10,
        position: "relative"
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#555" }}
      />

      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
      />

      {editing ? (
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          style={{
            width: "95%",
            textAlign: "center",
            fontSize: 10
          }}
        />
      ) : (
        <div onDoubleClick={() => setEditing(true)}>
          <small style={{ display: "block" }}>ID: {id}</small>
          {label}
        </div>
      )}
    </div>
  );
};

/** NODO Aborto */
const AbortoNode = ({ data, id }) => {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data?.label || "✖"); // Por defecto "✖"

  const handleBlur = () => {
    setEditing(false);
    if (data?.onEdit) {
      data.onEdit(id, label);
    }
  };

  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: "#fcd34d",
        border: "2px solid #b45309",
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 10,
        position: "relative"
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#555" }}
      />

      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
      />

      {editing ? (
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          style={{
            width: "95%",
            textAlign: "center",
            fontSize: 10
          }}
        />
      ) : (
        <div onDoubleClick={() => setEditing(true)}>
          <small style={{ display: "block" }}>ID: {id}</small>
          {label}
        </div>
      )}
    </div>
  );
};

/** NODO Adopción */
const AdopcionNode = ({ data, id }) => {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data?.label || "A"); // Por defecto "A"

  const handleBlur = () => {
    setEditing(false);
    if (data?.onEdit) {
      data.onEdit(id, label);
    }
  };

  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: "#e0f2fe",
        border: "2px dotted #4b5563",
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 10,
        position: "relative"
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#555" }}
      />

      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
      />

      {editing ? (
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          style={{
            width: "95%",
            textAlign: "center",
            fontSize: 10
          }}
        />
      ) : (
        <div onDoubleClick={() => setEditing(true)}>
          <small style={{ display: "block" }}>ID: {id}</small>
          {label}
        </div>
      )}
    </div>
  );
};

const nodeTypes = {
  paciente: EditableNode,
  masculino: MasculinoNode,
  femenino: FemeninoNode,
  fallecidoM: FallecidoMNode,
  fallecidoF: FallecidoFNode,
  embarazo: EmbarazoNode,
  aborto: AbortoNode,
  adopcion: AdopcionNode
};

/** =====================================================
 * FUNCIONES AUXILIARES
 * ===================================================== */

/** Crea un "zigzag path" con picos marcados (triangular). */
function createZigZagPath(x0, y0, x1, y1, amplitude = 15, segments = 6) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const angle = Math.atan2(dy, dx);

  let path = `M ${x0},${y0}`;
  for (let i = 1; i <= segments; i++) {
    const t = i / segments;
    const xBase = x0 + dx * t;
    const yBase = y0 + dy * t;
    const sign = i % 2 === 0 ? 1 : -1;
    const perpAngle = angle + Math.PI / 2;
    const xPeak = xBase + sign * amplitude * Math.cos(perpAngle);
    const yPeak = yBase + sign * amplitude * Math.sin(perpAngle);
    path += ` L ${xPeak},${yPeak}`;
  }
  path += ` L ${x1},${y1}`;
  return path;
}

/** Crea una onda más redondeada (usando curvas cuadráticas). */
function createRoundedWavePath(x0, y0, x1, y1, amplitude = 10, frequency = 4) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const angle = Math.atan2(dy, dx);

  let path = `M ${x0},${y0}`;

  for (let i = 1; i <= frequency; i++) {
    const t0 = (i - 1) / frequency;
    const t1 = i / frequency;

    const xStart = x0 + dx * t0;
    const yStart = y0 + dy * t0;
    const xEnd = x0 + dx * t1;
    const yEnd = y0 + dy * t1;

    // Punto medio del segmento
    const xMid = (xStart + xEnd) / 2;
    const yMid = (yStart + yEnd) / 2;

    // Perpendicular
    const perpAngle = angle + Math.PI / 2;
    // Alterna cresta / valle
    const sign = i % 2 === 0 ? 1 : -1;
    const xCtrl = xMid + sign * amplitude * Math.cos(perpAngle);
    const yCtrl = yMid + sign * amplitude * Math.sin(perpAngle);

    // Curva cuadrática Q
    path += ` Q ${xCtrl},${yCtrl} ${xEnd},${yEnd}`;
  }

  return path;
}

/** =====================================================
 *  Edge personalizado: RelationshipEdge
 * ===================================================== */
function RelationshipEdge(props) {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    data = {},
    markerEnd
  } = props;

  const relType = data.relType || "matrimonio";

  let edgePath = "";
  let strokeColor = "black";
  let strokeWidth = 2;
  let pathProps = { fill: "none" };
  let extraElements = null;

  // Path "defaultSmooth"
  const [defaultSmooth, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition
  });
  const midX = labelX;
  const midY = labelY;

  switch (relType) {
    case "matrimonio":
      edgePath = defaultSmooth;
      break;

    case "divorcio":
      edgePath = defaultSmooth;
      extraElements = (
        <>
          <line
            x1={midX + 5}
            y1={midY - 12}
            x2={midX - 5}
            y2={midY + 12}
            stroke="black"
            strokeWidth={2}
          />
          <line
            x1={midX}
            y1={midY - 12}
            x2={midX - 10}
            y2={midY + 12}
            stroke="black"
            strokeWidth={2}
          />
        </>
      );
      break;

    case "cohabitacion":
      strokeColor = "black";
      strokeWidth = 2;
      pathProps.strokeDasharray = "4 4";
      edgePath = defaultSmooth;
      extraElements = (
        <path
          d={`
            M ${midX - 8},${midY}
            L ${midX},${midY - 8}
            L ${midX + 8},${midY}
            L ${midX + 8},${midY + 8}
            L ${midX - 8},${midY + 8}
            Z
          `}
          fill="none"
          stroke="black"
          strokeWidth={2}
        />
      );
      break;

    case "compromiso":
      strokeColor = "black";
      pathProps.strokeDasharray = "6 3";
      edgePath = defaultSmooth;
      break;

    case "violencia":
      // color rojo
      strokeColor = "#ff0000";
      strokeWidth = 2;
      // Onda redondeada
      edgePath = createRoundedWavePath(sourceX, sourceY, targetX, targetY, 30, 30);
      break;

    case "conflicto":
      // color bordó
      strokeColor = "#800000";
      strokeWidth = 2;
      // Zigzag
      edgePath = createZigZagPath(sourceX, sourceY, targetX, targetY, 12, 10);
      break;

    case "cercana":
      // verde agua
      const aquaColor = "#20c997";
      // Dos líneas paralelas
      const [path1] = getSmoothStepPath({
        sourceX,
        sourceY: sourceY - 3,
        targetX,
        targetY: targetY - 3,
        sourcePosition,
        targetPosition
      });
      const [path2] = getSmoothStepPath({
        sourceX,
        sourceY: sourceY + 3,
        targetX,
        targetY: targetY + 3,
        sourcePosition,
        targetPosition
      });
      extraElements = (
        <>
          <path
            d={path1}
            stroke={aquaColor}
            strokeWidth="3"
            fill="none"
          />
          <path
            d={path2}
            stroke={aquaColor}
            strokeWidth="3"
            fill="none"
          />
        </>
      );
      // no principal
      edgePath = "";
      break;

    case "distante":
      // color rojo con dash
      strokeColor = "#ff0000";
      pathProps.strokeDasharray = "6 6";
      edgePath = defaultSmooth;
      break;

    case "rota":
      strokeColor = "gray";
      edgePath = defaultSmooth;
      extraElements = (
        <>
          <line
            x1={midX - 3}
            y1={midY - 8}
            x2={midX - 3}
            y2={midY + 8}
            stroke="gray"
            strokeWidth={3}
          />
          <line
            x1={midX + 3}
            y1={midY - 8}
            x2={midX + 3}
            y2={midY + 8}
            stroke="gray"
            strokeWidth={3}
          />
        </>
      );
      break;

    default:
      edgePath = defaultSmooth;
      break;
  }

  return (
    <g className="react-flow__edge">
      {edgePath && (
        <path
          id={id}
          className="react-flow__edge-path"
          d={edgePath}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          markerEnd={markerEnd}
          {...pathProps}
        />
      )}
      {extraElements}
    </g>
  );
}

const edgeTypes = {
  relationshipEdge: RelationshipEdge
};

/** Paleta de nodos */
const nodePalette = [
  { type: "masculino", label: "Hombre" },
  { type: "femenino", label: "Mujer" },
  { type: "fallecidoM", label: "H. Fallecido" },
  { type: "fallecidoF", label: "M. Fallecida" },
  { type: "embarazo", label: "Embarazo" },
  { type: "aborto", label: "Aborto" },
  { type: "adopcion", label: "Adopción" }
];

/** ========================
 *  Barra Lateral (Sidebar)
 * ======================== */
function Sidebar({ onRelate }) {
  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [relType, setRelType] = useState("matrimonio");

  const relationshipTypes = [
    "matrimonio",
    "divorcio",
    "cohabitacion",
    "compromiso",
    "conflicto",
    "violencia",
    "cercana",
    "distante",
    "rota"
  ];

  return (
    <div
      style={{
        width: "20vw",
        background: "#f3f4f6",
        padding: 10,
        borderLeft: "1px solid #ccc",
        overflowY: "auto"
      }}
    >
      <h3 className="font-bold mb-2">Agregar nodo</h3>
      {nodePalette.map((item, idx) => (
        <div
          key={idx}
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData("application/reactflow", JSON.stringify(item))
          }
          style={{
            padding: 10,
            marginBottom: 8,
            background: "#e5e7eb",
            cursor: "grab",
            borderRadius: 6,
            textAlign: "center"
          }}
        >
          {item.label}
        </div>
      ))}

      <hr className="my-4" />
      <h4>Crear relación</h4>
      <input
        placeholder="ID origen"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        style={{ width: "100%", marginBottom: 5 }}
      />
      <input
        placeholder="ID destino"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        style={{ width: "100%", marginBottom: 5 }}
      />
      <select
        value={relType}
        onChange={(e) => setRelType(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      >
        {relationshipTypes.map((rel) => (
          <option key={rel} value={rel}>
            {rel}
          </option>
        ))}
      </select>
      <button
        onClick={() => onRelate(source, target, relType)}
        style={{
          width: "100%",
          background: "#3b82f6",
          color: "white",
          padding: 6,
          border: "none",
          borderRadius: 4,
          cursor: "pointer"
        }}
      >
        Relacionar
      </button>

      <hr className="my-4" />
      <h4>Leyenda de relaciones</h4>
      {/* Matrimonio */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
        <svg width="80" height="20">
          <path d="M10,10 L70,10" stroke="black" strokeWidth="2" />
        </svg>
        <span style={{ marginLeft: 8 }}>Matrimonio</span>
      </div>

      {/* Divorcio */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
        <svg width="80" height="20">
          {/* Línea horizontal principal */}
          <path d="M10,10 L70,10" stroke="black" strokeWidth="2" />
          {/* 2 líneas inclinadas hacia la izquierda */}
          <line
            x1="45"
            y1="0"
            x2="35"
            y2="20"
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1="49"
            y1="0"
            x2="39"
            y2="20"
            stroke="black"
            strokeWidth="2"
          />
        </svg>
        <span style={{ marginLeft: 8 }}>Divorcio</span>
      </div>

      {/* Cohabitación */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
        <svg width="80" height="20">
          <path
            d="M10,10 L70,10"
            stroke="black"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <path
            d="M38,10 L40,6 L42,10 L42,14 L38,14 Z"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
        </svg>
        <span style={{ marginLeft: 8 }}>Cohabitación</span>
      </div>

      {/* Compromiso */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
        <svg width="80" height="20">
          <path
            d="M10,10 L70,10"
            stroke="black"
            strokeDasharray="6 3"
            strokeWidth="2"
          />
        </svg>
        <span style={{ marginLeft: 8 }}>Compromiso</span>
      </div>

      {/* Conflicto (bordó, picos) */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
        <svg width="80" height="20">
          <path
            d="M10,10 L20,0 L30,20 L40,0 L50,20 L60,0 L70,10"
            stroke="#800000"
            strokeWidth="2"
            fill="none"
          />
        </svg>
        <span style={{ marginLeft: 8 }}>Conflicto</span>
      </div>

      {/* Violencia (rojo, onda redondeada) */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
        <svg width="80" height="20">
          <path
            d="M10,10 Q 15,0 20,10 Q 25,20 30,10 Q 35,0 40,10 Q 45,20 50,10 Q 55,0 60,10 Q 65,20 70,10"
            stroke="#ff0000"
            strokeWidth="2"
            fill="none"
          />
        </svg>
        <span style={{ marginLeft: 8 }}>Violencia</span>
      </div>

      {/* Cercana (dos líneas "verde agua") */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
        <svg width="80" height="20">
          <path d="M10,7 L70,7" stroke="#20c997" strokeWidth="3" />
          <path d="M10,13 L70,13" stroke="#20c997" strokeWidth="3" />
        </svg>
        <span style={{ marginLeft: 8 }}>Relación cercana</span>
      </div>

      {/* Distante (rojo punteado) */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
        <svg width="80" height="20">
          <line
            x1="10"
            y1="10"
            x2="70"
            y2="10"
            stroke="#ff0000"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
        </svg>
        <span style={{ marginLeft: 8 }}>Relación distante</span>
      </div>

      {/* Rota (dos barras verticales) */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
        <svg width="80" height="20">
          <path d="M10,10 L70,10" stroke="gray" strokeWidth="2" />
          <line x1="38" y1="5" x2="38" y2="15" stroke="gray" strokeWidth="3" />
          <line x1="42" y1="5" x2="42" y2="15" stroke="gray" strokeWidth="3" />
        </svg>
        <span style={{ marginLeft: 8 }}>Relación rota</span>
      </div>
    </div>
  );
}

/** ========================
 *  Componente principal
 * ======================== */
function GenogramaEditorWrapper() {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "1",
      type: "paciente", // Este es editable
      position: { x: 250, y: 100 },
      data: { label: "Paciente" }
    }
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [idCounter, setIdCounter] = useState(2);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onRelate = useCallback(
    (source, target, relType) => {
      // Pequeño "toast" en pantalla
      const showToast = (msg, success = true) => {
        const div = document.createElement("div");
        div.textContent = msg;
        Object.assign(div.style, {
          position: "absolute",
          top: "10px",
          right: "10px",
          background: success ? "#4ade80" : "#f87171",
          color: "white",
          padding: "8px 12px",
          borderRadius: "8px",
          zIndex: 9999
        });
        document.body.appendChild(div);
        setTimeout(() => document.body.removeChild(div), 2500);
      };

      const sourceExists = nodes.some((n) => n.id === source);
      const targetExists = nodes.some((n) => n.id === target);
      if (!sourceExists || !targetExists) {
        showToast("❌ Uno o ambos IDs no existen.", false);
        return;
      }

      // Reemplazamos el edge previo (si existe) y creamos uno nuevo
      setEdges((eds) => [
        ...eds.filter(
          (edge) => !(edge.source === source && edge.target === target)
        ),
        {
          id: `${source}-${target}-${relType}`,
          source,
          target,
          type: "relationshipEdge",
          data: { relType }
        }
      ]);

      // Resaltamos los nodos
      setNodes((nds) =>
        nds.map((node) =>
          node.id === source || node.id === target
            ? {
                ...node,
                style: {
                  ...node.style,
                  boxShadow: "0 0 0 4px rgba(59,130,246,0.5)"
                }
              }
            : node
        )
      );

      showToast(`✔ Relación '${relType}' creada entre ${source} y ${target}`);
    },
    [nodes, setEdges, setNodes]
  );

  // Arrastrar nodos al canvas
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const data = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top
      };

      const newNode = {
        id: String(idCounter),
        type: data.type,
        position,
        data: { label: data.label }
      };
      setNodes((nds) => nds.concat(newNode));
      setIdCounter((prev) => prev + 1);
    },
    [idCounter, setNodes]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Editar etiqueta en todos los nodos que usan data.onEdit
  const handleEditLabel = useCallback(
    (id, newLabel) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, label: newLabel } }
            : node
        )
      );
    },
    [setNodes]
  );

  return (
    <ReactFlowProvider>
      <div style={{ display: "flex", height: "100vh" }}>
        <div
          style={{ width: "80vw", height: "100vh" }}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <ReactFlow
            nodes={nodes.map((node) => ({
              ...node,
              data: { ...node.data, onEdit: handleEditLabel }
            }))}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background gap={12} size={1} />
          </ReactFlow>
        </div>
        <Sidebar onRelate={onRelate} />
      </div>
    </ReactFlowProvider>
  );
}

export default GenogramaEditorWrapper;
export { nodeTypes, edgeTypes };
