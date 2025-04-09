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
import html2canvas from "html2canvas";

/** ========================
 *  Nodo editable, con label debajo
 * ======================== */
const PacienteNode = ({ data, id, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data?.label || "");

  const handleBlur = () => {
    setEditing(false);
    if (onEdit) {
      onEdit(id, label);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* La forma del nodo */}
      <div
        style={{
          width: 80,
          height: 80,
          background: "#e0f7fa",
          borderRadius: 10,
          border: "1px solid #0288d1",
          position: "relative"
        }}
      >
        {/* Handles: arriba/abajo */}
        <Handle type="target" position={Position.Top} style={{ background: "#555" }} />
        <Handle type="source" position={Position.Bottom} style={{ background: "#555" }} />

        {/* Handles: izquierda/derecha */}
        <Handle type="target" position={Position.Left} style={{ background: "#555" }} />
        <Handle type="source" position={Position.Right} style={{ background: "#555" }} />
      </div>

      {/* Label debajo */}
      {editing ? (
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          style={{ textAlign: "center", marginTop: 4 }}
        />
      ) : (
        <div
          onDoubleClick={() => setEditing(true)}
          style={{ marginTop: 4, textAlign: "center" }}
        >
          <strong>ID: {id}</strong> <br />
          {label}
        </div>
      )}
    </div>
  );
};

/** NODO Masculino, label debajo */
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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          width: 60,
          height: 60,
          background: "#ddd6fe",
          border: "2px solid #4f46e5",
          position: "relative"
        }}
      >
        <Handle type="target" position={Position.Top} style={{ background: "#555" }} />
        <Handle type="source" position={Position.Bottom} style={{ background: "#555" }} />

        <Handle type="target" position={Position.Left} style={{ background: "#555" }} />
        <Handle type="source" position={Position.Right} style={{ background: "#555" }} />
      </div>
      {editing ? (
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          style={{ textAlign: "center", fontSize: 10, marginTop: 4 }}
        />
      ) : (
        <div
          onDoubleClick={() => setEditing(true)}
          style={{ marginTop: 4, textAlign: "center", fontSize: 10 }}
        >
          <strong>ID: {id}</strong> <br />
          {label}
        </div>
      )}
    </div>
  );
};

/** NODO Femenino, label debajo */
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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: "999px",
          background: "#fbcfe8",
          border: "2px solid #be185d",
          position: "relative"
        }}
      >
        <Handle type="target" position={Position.Top} style={{ background: "#555" }} />
        <Handle type="source" position={Position.Bottom} style={{ background: "#555" }} />

        <Handle type="target" position={Position.Left} style={{ background: "#555" }} />
        <Handle type="source" position={Position.Right} style={{ background: "#555" }} />
      </div>

      {editing ? (
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          style={{ textAlign: "center", fontSize: 10, marginTop: 4 }}
        />
      ) : (
        <div
          onDoubleClick={() => setEditing(true)}
          style={{ marginTop: 4, textAlign: "center", fontSize: 10 }}
        >
          <strong>ID: {id}</strong> <br />
          {label}
        </div>
      )}
    </div>
  );
};

/** NODO Fallecido Masculino, label debajo */
const FallecidoMNode = ({ data, id }) => {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data?.label || "");

  const handleBlur = () => {
    setEditing(false);
    if (data?.onEdit) {
      data.onEdit(id, label);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          width: 60,
          height: 60,
          background: "#fee2e2",
          border: "2px solid #7f1d1d",
          position: "relative"
        }}
      >
        <Handle type="target" position={Position.Top} style={{ background: "#555" }} />
        <Handle type="source" position={Position.Bottom} style={{ background: "#555" }} />
        <Handle type="target" position={Position.Left} style={{ background: "#555" }} />
        <Handle type="source" position={Position.Right} style={{ background: "#555" }} />

        {/* Cruz que cruce completamente el cuadrado */}
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <line x1="0" y1="0" x2="60" y2="60" stroke="#7f1d1d" strokeWidth="2" />
          <line x1="60" y1="0" x2="0" y2="60" stroke="#7f1d1d" strokeWidth="2" />
        </svg>
      </div>
      {editing ? (
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          style={{ textAlign: "center", fontSize: 10, marginTop: 4 }}
        />
      ) : (
        <div
          onDoubleClick={() => setEditing(true)}
          style={{ marginTop: 4, textAlign: "center", fontSize: 10 }}
        >
          <strong>ID: {id}</strong> <br />
          {label}
        </div>
      )}
    </div>
  );
};

/** NODO Fallecido Femenino, label debajo */
const FallecidoFNode = ({ data, id }) => {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data?.label || "");

  const handleBlur = () => {
    setEditing(false);
    if (data?.onEdit) {
      data.onEdit(id, label);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "#fff1f2",
          border: "2px solid #be123c",
          position: "relative"
        }}
      >
        <Handle type="target" position={Position.Top} style={{ background: "#555" }} />
        <Handle type="source" position={Position.Bottom} style={{ background: "#555" }} />
        <Handle type="target" position={Position.Left} style={{ background: "#555" }} />
        <Handle type="source" position={Position.Right} style={{ background: "#555" }} />

        {/* Cruz centrada en el círculo */}
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <line x1="0" y1="0" x2="60" y2="60" stroke="#be123c" strokeWidth="2" />
          <line x1="60" y1="0" x2="0" y2="60" stroke="#be123c" strokeWidth="2" />
        </svg>
      </div>
      {editing ? (
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          style={{ textAlign: "center", fontSize: 10, marginTop: 4 }}
        />
      ) : (
        <div
          onDoubleClick={() => setEditing(true)}
          style={{ marginTop: 4, textAlign: "center", fontSize: 10 }}
        >
          <strong>ID: {id}</strong> <br />
          {label}
        </div>
      )}
    </div>
  );
};

/** NODO Embarazo, label debajo */
const EmbarazoNode = ({ data, id }) => {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data?.label || "E");

  const handleBlur = () => {
    setEditing(false);
    if (data?.onEdit) {
      data.onEdit(id, label);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "#fffbe6",
          border: "2px dashed #facc15",
          position: "relative"
        }}
      >
        <Handle type="target" position={Position.Top} style={{ background: "#555" }} />
        <Handle type="source" position={Position.Bottom} style={{ background: "#555" }} />

        <Handle type="target" position={Position.Left} style={{ background: "#555" }} />
        <Handle type="source" position={Position.Right} style={{ background: "#555" }} />
      </div>
      {editing ? (
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          style={{ textAlign: "center", fontSize: 10, marginTop: 4, width: 40 }}
        />
      ) : (
        <div
          onDoubleClick={() => setEditing(true)}
          style={{ marginTop: 4, textAlign: "center", fontSize: 10, width: 50 }}
        >
          <strong>ID: {id}</strong> <br />
          {label}
        </div>
      )}
    </div>
  );
};

/** NODO Aborto, label debajo */
const AbortoNode = ({ data, id }) => {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data?.label || "✖");

  const handleBlur = () => {
    setEditing(false);
    if (data?.onEdit) {
      data.onEdit(id, label);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "#fcd34d",
          border: "2px solid #b45309",
          position: "relative"
        }}
      >
        <Handle type="target" position={Position.Top} style={{ background: "#555" }} />
        <Handle type="source" position={Position.Bottom} style={{ background: "#555" }} />
        <Handle type="target" position={Position.Left} style={{ background: "#555" }} />
        <Handle type="source" position={Position.Right} style={{ background: "#555" }} />
      </div>

      {editing ? (
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          style={{ textAlign: "center", fontSize: 10, marginTop: 4, width: 40 }}
        />
      ) : (
        <div
          onDoubleClick={() => setEditing(true)}
          style={{ marginTop: 4, textAlign: "center", fontSize: 10, width: 50 }}
        >
          <strong>ID: {id}</strong> <br />
          {label}
        </div>
      )}
    </div>
  );
};

/** NODO Adopción, label debajo */
const AdopcionNode = ({ data, id }) => {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data?.label || "A");

  const handleBlur = () => {
    setEditing(false);
    if (data?.onEdit) {
      data.onEdit(id, label);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "#e0f2fe",
          border: "2px dotted #4b5563",
          position: "relative"
        }}
      >
        <Handle type="target" position={Position.Top} style={{ background: "#555" }} />
        <Handle type="source" position={Position.Bottom} style={{ background: "#555" }} />
        <Handle type="target" position={Position.Left} style={{ background: "#555" }} />
        <Handle type="source" position={Position.Right} style={{ background: "#555" }} />
      </div>

      {editing ? (
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          style={{ textAlign: "center", fontSize: 10, marginTop: 4, width: 40 }}
        />
      ) : (
        <div
          onDoubleClick={() => setEditing(true)}
          style={{ marginTop: 4, textAlign: "center", fontSize: 10, width: 50 }}
        >
          <strong>ID: {id}</strong> <br />
          {label}
        </div>
      )}
    </div>
  );
};

/** Node types unificados */
const nodeTypes = {
  paciente: PacienteNode,
  masculino: MasculinoNode,
  femenino: FemeninoNode,
  fallecidoM: FallecidoMNode,
  fallecidoF: FallecidoFNode,
  embarazo: EmbarazoNode,
  aborto: AbortoNode,
  adopcion: AdopcionNode
};

/** =====================================================
 * FUNCIONES AUXILIARES (para edges)
 * ===================================================== */
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
    const xMid = (xStart + xEnd) / 2;
    const yMid = (yStart + yEnd) / 2;
    const perpAngle = angle + Math.PI / 2;
    const sign = i % 2 === 0 ? 1 : -1;
    const xCtrl = xMid + sign * amplitude * Math.cos(perpAngle);
    const yCtrl = yMid + sign * amplitude * Math.sin(perpAngle);
    path += ` Q ${xCtrl},${yCtrl} ${xEnd},${yEnd}`;
  }
  return path;
}

/** Edge personalizado */
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
          d={`M ${midX - 8},${midY} L ${midX},${midY - 8} L ${midX + 8},${midY}
              L ${midX + 8},${midY + 8} L ${midX - 8},${midY + 8} Z`}
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
      strokeColor = "#ff0000";
      strokeWidth = 2;
      edgePath = createRoundedWavePath(sourceX, sourceY, targetX, targetY, 30, 30);
      break;

    case "conflicto":
      strokeColor = "#800000";
      strokeWidth = 2;
      edgePath = createZigZagPath(sourceX, sourceY, targetX, targetY, 12, 10);
      break;

    case "cercana":
      const aquaColor = "#20c997";
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
          <path d={path1} stroke={aquaColor} strokeWidth="3" fill="none" />
          <path d={path2} stroke={aquaColor} strokeWidth="3" fill="none" />
        </>
      );
      edgePath = "";
      break;

    case "distante":
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

/** Paleta de nodos + Etiqueta + Minishape (agrandados) */
function MiniIcon({ type }) {
  // Aumentamos de 12x12 a 20x20
  switch (type) {
    case "masculino":
      return (
        <div
          style={{
            width: 20,
            height: 20,
            background: "#ddd6fe",
            border: "2px solid #4f46e5",
            marginRight: 6
          }}
        />
      );
    case "femenino":
      return (
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "999px",
            background: "#fbcfe8",
            border: "2px solid #be185d",
            marginRight: 6
          }}
        />
      );
    case "fallecidoM":
      return (
        <div
          style={{
            width: 20,
            height: 20,
            background: "#fee2e2",
            border: "2px solid #7f1d1d",
            position: "relative",
            marginRight: 6
          }}
        >
          {/* Cruz centrada y que cruce los vértices */}
          <div
            style={{
              width: 2,
              height: 28,
              background: "#7f1d1d",
              position: "absolute",
              top: -4,
              left: 9,
              transform: "rotate(45deg)"
            }}
          />
          <div
            style={{
              width: 2,
              height: 28,
              background: "#7f1d1d",
              position: "absolute",
              top: -4,
              left: 9,
              transform: "rotate(-45deg)"
            }}
          />
        </div>
      );
    case "fallecidoF":
      return (
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#fff1f2",
            border: "2px solid #be123c",
            position: "relative",
            marginRight: 6
          }}
        >
          {/* Cruz centrada en el círculo */}
          <div
            style={{
              width: 2,
              height: 28,
              background: "#be123c",
              position: "absolute",
              top: -4,
              left: 9,
              transform: "rotate(45deg)"
            }}
          />
          <div
            style={{
              width: 2,
              height: 28,
              background: "#be123c",
              position: "absolute",
              top: -4,
              left: 9,
              transform: "rotate(-45deg)"
            }}
          />
        </div>
      );
    case "embarazo":
      return (
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#fffbe6",
            border: "2px dashed #facc15",
            marginRight: 6
          }}
        />
      );
    case "aborto":
      return (
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#fcd34d",
            border: "2px solid #b45309",
            position: "relative",
            marginRight: 6
          }}
        >
          <div
            style={{
              width: 2,
              height: 20,
              background: "#b45309",
              position: "absolute",
              top: 0,
              left: 9
            }}
          />
        </div>
      );
    case "adopcion":
      return (
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#e0f2fe",
            border: "2px dotted #4b5563",
            marginRight: 6
          }}
        />
      );
    case "paciente":
      return (
        <div
          style={{
            width: 20,
            height: 20,
            background: "#e0f7fa",
            borderRadius: 4,
            border: "1px solid #0288d1",
            marginRight: 6
          }}
        />
      );
    default:
      return (
        <div
          style={{
            width: 20,
            height: 20,
            background: "#ccc",
            marginRight: 6
          }}
        />
      );
  }
}

const nodePalette = [
  { type: "masculino", label: "Hombre" },
  { type: "femenino", label: "Mujer" },
  { type: "fallecidoM", label: "H. Fallecido" },
  { type: "fallecidoF", label: "M. Fallecida" },
  { type: "embarazo", label: "Embarazo" },
  { type: "aborto", label: "Aborto" },
  { type: "adopcion", label: "Adopción" }
];

/** Barra lateral */
function Sidebar({
  onRelate,
  onImportJSON,
  onExportJSON,
  onExportCSV,
  onExportPNG,
  onExportJPG
}) {
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
            textAlign: "center",
            display: "flex",
            alignItems: "center"
          }}
        >
          <MiniIcon type={item.type} />
          <span>{item.label}</span>
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
      <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
        <svg width="80" height="20">
          <path d="M10,10 L70,10" stroke="black" strokeWidth="2" />
        </svg>
        <span style={{ marginLeft: 8 }}>Matrimonio</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
        <svg width="80" height="20">
          <path d="M10,10 L70,10" stroke="black" strokeWidth="2" />
          <line x1="45" y1="0" x2="35" y2="20" stroke="black" strokeWidth="2" />
          <line x1="49" y1="0" x2="39" y2="20" stroke="black" strokeWidth="2" />
        </svg>
        <span style={{ marginLeft: 8 }}>Divorcio</span>
      </div>

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

      <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
        <svg width="80" height="20">
          <path d="M10,7 L70,7" stroke="#20c997" strokeWidth="3" />
          <path d="M10,13 L70,13" stroke="#20c997" strokeWidth="3" />
        </svg>
        <span style={{ marginLeft: 8 }}>Relación cercana</span>
      </div>

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

      <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
        <svg width="80" height="20">
          <path d="M10,10 L70,10" stroke="gray" strokeWidth="2" />
          <line x1="38" y1="5" x2="38" y2="15" stroke="gray" strokeWidth="3" />
          <line x1="42" y1="5" x2="42" y2="15" stroke="gray" strokeWidth="3" />
        </svg>
        <span style={{ marginLeft: 8 }}>Relación rota</span>
      </div>

      <hr className="my-4" />
      <h4>Importar/Exportar</h4>
      <input
        type="file"
        accept=".json"
        onChange={onImportJSON}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <button
        onClick={onExportJSON}
        style={{
          width: "100%",
          background: "#10b981",
          color: "white",
          padding: 6,
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          marginBottom: 6
        }}
      >
        Exportar JSON
      </button>
      <button
        onClick={onExportCSV}
        style={{
          width: "100%",
          background: "#a855f7",
          color: "white",
          padding: 6,
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          marginBottom: 6
        }}
      >
        Exportar CSV
      </button>
      <button
        onClick={onExportPNG}
        style={{
          width: "100%",
          background: "#0ea5e9",
          color: "white",
          padding: 6,
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          marginBottom: 6
        }}
      >
        Exportar PNG
      </button>
      <button
        onClick={onExportJPG}
        style={{
          width: "100%",
          background: "#ec4899",
          color: "white",
          padding: 6,
          border: "none",
          borderRadius: 4,
          cursor: "pointer"
        }}
      >
        Exportar JPG
      </button>
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
      type: "paciente",
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

      setEdges((eds) => [
        ...eds.filter((edge) => !(edge.source === source && edge.target === target)),
        {
          id: `${source}-${target}-${relType}`,
          source,
          target,
          type: "relationshipEdge",
          data: { relType }
        }
      ]);

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
      const data = JSON.parse(event.dataTransfer.getData("application/reactflow"));
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

  // Editar etiqueta
  const handleEditLabel = useCallback(
    (id, newLabel) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, label: newLabel } } : node
        )
      );
    },
    [setNodes]
  );

  /** ========================
   * IMPORT / EXPORT
   * ======================== */
  const onImportJSON = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (parsed.nodes && parsed.edges) {
            setNodes(parsed.nodes);
            setEdges(parsed.edges);
            let maxId = 0;
            parsed.nodes.forEach((n) => {
              const numericId = parseInt(n.id, 10);
              if (!isNaN(numericId) && numericId > maxId) {
                maxId = numericId;
              }
            });
            setIdCounter(maxId + 1);
          } else {
            alert("Archivo JSON inválido.");
          }
        } catch (err) {
          alert("Error al leer JSON.");
        }
      };
      reader.readAsText(file);
    },
    [setNodes, setEdges]
  );

  const onExportJSON = useCallback(() => {
    const dataToExport = { nodes, edges };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(dataToExport, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "genograma.json";
    link.click();
  }, [nodes, edges]);

  const onExportCSV = useCallback(() => {
    let csv = "type,id,label,x,y,source,target,relType\n";
    nodes.forEach((node) => {
      csv += `"node","${node.id}","${node.data.label}",${node.position.x},${node.position.y},,,\n`;
    });
    edges.forEach((edge) => {
      csv += `"edge","${edge.id}",,,,${edge.source},${edge.target},${
        edge.data?.relType || ""
      }\n`;
    });
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "genograma.csv";
    link.click();
  }, [nodes, edges]);

  // Exportar como imagen usando html2canvas
  const onExportImage = useCallback(
    async (format = "png") => {
      const flowArea = document.querySelector(".react-flow"); // contenedor principal
      if (!flowArea) return;
      try {
        const canvas = await html2canvas(flowArea);
        const dataUrl = canvas.toDataURL(`image/${format}`);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `genograma.${format}`;
        link.click();
      } catch (err) {
        alert("Ocurrió un error al exportar la imagen.");
      }
    },
    []
  );

  const onExportPNG = useCallback(() => {
    onExportImage("png");
  }, [onExportImage]);

  const onExportJPG = useCallback(() => {
    onExportImage("jpeg");
  }, [onExportImage]);

  return (
    <ReactFlowProvider>
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ width: "80vw", height: "100vh" }} onDrop={onDrop} onDragOver={onDragOver}>
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
        <Sidebar
          onRelate={onRelate}
          onImportJSON={onImportJSON}
          onExportJSON={onExportJSON}
          onExportCSV={onExportCSV}
          onExportPNG={onExportPNG}
          onExportJPG={onExportJPG}
        />
      </div>
    </ReactFlowProvider>
  );
}

export default GenogramaEditorWrapper;
export { nodeTypes, edgeTypes };
