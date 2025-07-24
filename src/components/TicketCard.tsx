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
  isEditing: boolean;
  onStartEdit: (id: string) => void;
  onStopEdit: () => void;
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  columns,
  onEdit,
  onDelete,
  onDragStart,
  isEditing,
  onStartEdit,
  onStopEdit,
}) => {
  return (
    <div
      className="kanban-card"
      draggable={!isEditing}
      onDragStart={() => !isEditing && onDragStart(ticket.id)}>
      {isEditing ? (
        <>
          <input
            className="kanban-card-title"
            value={ticket.title}
            onChange={(e) => onEdit(ticket.id, "title", e.target.value)}
            autoFocus
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
          <div className="kanban-card-actions">
            <button
              className="kanban-create-btn"
              onClick={onStopEdit}
              title="Save">
              Save
            </button>
            <button
              className="kanban-delete-btn"
              onClick={() => onDelete(ticket.id)}
              title="Delete">
              ✕
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="kanban-card-title-row">
            <div className="kanban-card-title-text">{ticket.title}</div>
            <button
              className="kanban-edit-btn"
              onClick={() => onStartEdit(ticket.id)}
              title="Edit">
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 13.5V16h2.5l7.06-7.06-2.5-2.5L4 13.5zM17.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.13 1.13 3.75 3.75 1.13-1.13z"
                  fill="#64748b"
                />
              </svg>
            </button>
          </div>
          <div className="kanban-card-desc-text">{ticket.description}</div>
          <div className="kanban-card-status-label">
            {columns.find((c) => c.key === ticket.status)?.label}
          </div>
          <div className="kanban-card-actions">
            <button
              className="kanban-delete-btn"
              onClick={() => onDelete(ticket.id)}
              title="Delete">
              ✕
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TicketCard;
