import React from "react";

export type Ticket = {
  id: string;
  title: string;
  description: string;
  status: string;
};

interface TicketCardProps {
  ticket: Ticket;
  columns: { key: string; label: string }[];
  onEdit: (id: string, field: keyof Ticket, value: string) => void;
  onDelete: (id: string) => void;
  onDragStart: (id: string) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  columns,
  onEdit,
  onDelete,
  onDragStart,
}) => {
  return (
    <div
      className="kanban-card"
      draggable
      onDragStart={() => onDragStart(ticket.id)}>
      <input
        className="kanban-card-title"
        value={ticket.title}
        onChange={(e) => onEdit(ticket.id, "title", e.target.value)}
      />
      <textarea
        className="kanban-card-desc"
        value={ticket.description}
        onChange={(e) => onEdit(ticket.id, "description", e.target.value)}
      />
      <select
        className="kanban-card-status"
        value={ticket.status}
        onChange={(e) => onEdit(ticket.id, "status", e.target.value)}>
        {columns.map((opt) => (
          <option key={opt.key} value={opt.key}>
            {opt.label}
          </option>
        ))}
      </select>
      <button
        className="kanban-delete-btn"
        onClick={() => onDelete(ticket.id)}
        title="Delete">
        ✕
      </button>
    </div>
  );
};

export default TicketCard;
